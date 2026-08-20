// Generate Zod schema modules from json-definitions/.
// Output mirrors json-definitions/ under zod/. Each source file -> one .ts module.
//
//   string enum + tsEnumNames         -> real `export enum` + z.enum(Enum)
//   object-valued enum (+tsEnumNames) -> `as const` map + z.union([z.object literals])
//   $ref                              -> import (name from target title); self-ref -> z.lazy
//   anyOf/oneOf -> z.union, allOf -> z.intersection, const -> z.literal
//   type:[...,"null"] -> .nullable(), additionalProperties:false -> .strict()
//
// Run: node scripts/generateZod.mjs
import {
  readFileSync, writeFileSync, mkdirSync, rmSync, existsSync,
} from "fs";
import { resolve, dirname, basename, relative, join } from "path";
import { execSync } from "child_process";

const SRC = "json-definitions";
const OUT = "zod";

const titleToSym = (t) => (t || "").replace(/[^A-Za-z0-9]/g, "");
// Zod schema-const name: reuse title if it already ends in "Schema" (object schemas),
// otherwise append it (enums, object-enums). Avoids "...SchemaSchema".
const schemaName = (t) => (/Schema$/.test(t) ? t : t + "Schema");
const WARNINGS = [];
const moduleBase = (f) => basename(f).replace(/\.json$/, ""); // keeps .enum/.ignore

// ---- pass 1: index every file's title + detect recursion -------------------
const files = execSync(`find ${SRC} -name '*.json'`).toString().trim().split("\n");
const titleOf = {}; // abs path -> symbol
for (const f of files) {
  let t = "";
  try { t = JSON.parse(readFileSync(f, "utf8")).title || ""; } catch {}
  if (!t) { const b = moduleBase(f); t = b === "index" ? basename(dirname(f)) : b; }
  titleOf[resolve(f)] = titleToSym(t);
}

const isStringEnum = (n) => Array.isArray(n.enum) && n.enum.every((v) => typeof v === "string");
const isObjectEnum = (n) => Array.isArray(n.enum) && n.enum.every((v) => v && typeof v === "object");

// ---- node -> zod expression -------------------------------------------------
function toZod(node, ctx) {
  if (!node || typeof node !== "object") return "z.unknown()";

  if (node.$ref) {
    const refPath = node.$ref.split("#")[0];
    if (refPath === "") { ctx.recursive = true; return `z.lazy(() => ${ctx.selfSchema})`; } // "#" self-ref
    const abs = resolve(ctx.dir, refPath);
    if (abs === ctx.selfAbs) { ctx.recursive = true; return `z.lazy(() => ${ctx.selfSchema})`; }
    if (!titleOf[abs]) { // broken source $ref (target file missing) -> permissive, warn
      WARNINGS.push(`${relative(process.cwd(), ctx.selfAbs)}: unresolved $ref ${node.$ref} -> z.unknown()`);
      return "z.unknown()";
    }
    const local = ctx.addImport(schemaName(titleOf[abs]), abs);
    return local;
  }

  if ("const" in node) return `z.literal(${JSON.stringify(node.const)})`;

  if (Array.isArray(node.enum)) return enumExpr(node, ctx);

  if (node.anyOf) return unionExpr(node.anyOf, ctx);
  if (node.oneOf) return unionExpr(node.oneOf, ctx);
  if (node.allOf) return node.allOf.map((s) => toZod(s, ctx)).reduce((a, b) => `z.intersection(${a}, ${b})`);

  // type may be array; peel "null" -> nullable
  let type = node.type;
  let nullable = false;
  if (Array.isArray(type)) {
    nullable = type.includes("null");
    const rest = type.filter((t) => t !== "null");
    type = rest.length === 1 ? rest[0] : rest; // multi non-null -> handled as unknown below
  }

  let expr;
  switch (type) {
    case "object": expr = objectExpr(node, ctx); break;
    case "array": expr = `z.array(${toZod(node.items || {}, ctx)})`; break;
    case "string": {
      if (node.format === "date-time") { expr = "z.iso.datetime()"; break; } // zod4: z.string().datetime() deprecated
      if (node.format === "date") { expr = "z.iso.date()"; break; }
      if (node.format === "email") { expr = "z.email()"; break; }     // zod4: z.string().email() deprecated
      if (node.format === "uri" || node.format === "url") { expr = "z.url()"; break; }
      expr = "z.string()";
      if (node.pattern) expr += `.regex(new RegExp(${JSON.stringify(node.pattern)}))`;
      break;
    }
    case "integer": expr = "z.number().int()"; break;
    case "number": expr = "z.number()"; break;
    case "boolean": expr = "z.boolean()"; break;
    case "null": return "z.null()";
    default: expr = "z.unknown()";
  }
  return nullable ? `${expr}.nullable()` : expr;
}

function unionExpr(list, ctx) {
  const parts = list.map((s) => toZod(s, ctx));
  return parts.length === 1 ? parts[0] : `z.union([${parts.join(", ")}])`;
}

function objectExpr(node, ctx) {
  const props = node.properties || {};
  const req = new Set(node.required || []);
  const lines = Object.entries(props).map(([k, v]) => {
    let e = toZod(v, ctx);
    if (v && v.description) e += `.meta({ description: ${JSON.stringify(v.description)} })`;
    if (!req.has(k)) e += ".optional()";
    return `  ${JSON.stringify(k)}: ${e},`;
  });
  let out = `z.object({\n${lines.join("\n")}\n})`;
  if (node.additionalProperties === false) out += ".strict()";
  return out;
}

// enums are emitted as top-level declarations; toZod returns a reference to them.
function enumExpr(node, ctx) {
  const name = ctx.selfSym;
  if (isStringEnum(node) && Array.isArray(node.tsEnumNames)) {
    const pairs = node.tsEnumNames.map((k, i) => `  ${JSON.stringify(k)} = ${JSON.stringify(node.enum[i])},`);
    ctx.pre.push(`export enum ${name} {\n${pairs.join("\n")}\n}`);
    ctx.isEnumDecl = true;
    return `z.enum(${name})`;
  }
  if (isStringEnum(node)) return `z.enum(${JSON.stringify(node.enum)})`;
  if (isObjectEnum(node)) {
    // as-const map keyed by tsEnumNames (preserves named access + exact type)
    const names = node.tsEnumNames || node.enum.map((_, i) => `_${i}`);
    const entries = node.enum.map((v, i) => `  ${JSON.stringify(names[i])}: ${JSON.stringify(v)},`);
    ctx.pre.push(`export const ${name} = {\n${entries.join("\n")}\n} as const;`);
    ctx.pre.push(`export type ${name} = (typeof ${name})[keyof typeof ${name}];`);
    ctx.isEnumDecl = true; // named type already declared
    const members = node.enum.map((v) =>
      `z.object({ ${Object.entries(v).map(([k, val]) => `${JSON.stringify(k)}: z.literal(${JSON.stringify(val)})`).join(", ")} })`);
    return `z.union([${members.join(", ")}])`;
  }
  // mixed -> literals union
  return `z.union([${node.enum.map((v) => `z.literal(${JSON.stringify(v)})`).join(", ")}])`;
}

// ---- module assembly --------------------------------------------------------
function generate(path) {
  const schema = JSON.parse(readFileSync(path, "utf8"));
  const selfAbs = resolve(path);
  const sym = titleOf[selfAbs];
  const selfSchema = schemaName(sym);
  const importsByPath = new Map(); // abs -> local name
  const usedLocals = new Set([sym, selfSchema]);
  const ctx = {
    dir: dirname(path), selfAbs, selfSym: sym, selfSchema, pre: [], recursive: false, isEnumDecl: false,
    addImport(wanted, abs) {
      if (importsByPath.has(abs)) return importsByPath.get(abs);
      let local = wanted, i = 2;
      while (usedLocals.has(local)) local = `${wanted}_${i++}`;
      usedLocals.add(local);
      importsByPath.set(abs, local);
      return local;
    },
  };

  const expr = toZod(schema, ctx);

  // import lines
  const imports = [...importsByPath.entries()].map(([abs, local]) => {
    const targetMod = join(dirname(relative(join(process.cwd(), SRC), abs)), moduleBase(abs));
    let spec = "./" + relative(dirname(relative(join(process.cwd(), SRC), selfAbs)), targetMod);
    spec = spec.replace(/\\/g, "/");
    if (!spec.startsWith(".")) spec = "./" + spec;
    const wanted = schemaName(titleOf[abs]);
    return local === wanted
      ? `import { ${wanted} } from "${spec}";`
      : `import { ${wanted} as ${local} } from "${spec}";`;
  });

  const constDecl = ctx.recursive
    ? `export const ${selfSchema}: z.ZodType<any> = ${expr};`
    : `export const ${selfSchema} = ${expr};`;
  const typeDecl = ctx.isEnumDecl || sym === selfSchema
    ? "" // enum/object-enum declared its own type; or const+type share the name (see below)
    : `export type ${sym} = z.infer<typeof ${selfSchema}>;`;
  // When the schema const name equals the title (object schema titled "* Schema"),
  // emit the type under the same identifier — TS keeps value and type namespaces separate.
  const sharedTypeDecl = !ctx.isEnumDecl && sym === selfSchema
    ? `export type ${sym} = z.infer<typeof ${selfSchema}>;`
    : "";

  const body = [
    `// AUTO-GENERATED from ${relative(process.cwd(), path)}. Do not edit by hand.`,
    `import { z } from "zod";`,
    imports.join("\n"),
    ctx.pre.join("\n\n"),
    constDecl,
    typeDecl,
    sharedTypeDecl,
  ].filter((s) => s && s.length).join("\n\n") + "\n";

  const outPath = join(OUT, relative(SRC, path)).replace(/\.json$/, ".ts");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, body);
  return outPath;
}

// ---- run --------------------------------------------------------------------
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
let n = 0;
for (const f of files) { generate(f); n++; }
console.log(`generated ${n} Zod modules under ${OUT}/`);
if (WARNINGS.length) {
  console.warn(`\n${WARNINGS.length} warning(s):`);
  for (const w of WARNINGS) console.warn("  " + w);
}
