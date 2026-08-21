# Migrating cvs-type-definitions from JSON Schema to Zod

Status: **generator built, all 167 modules generated + typecheck-clean** (2026-08-20).
Not yet wired into the published package (v18 co-existence step still pending).

## Try it

```
npm run generate:zod     # json-definitions/ -> zod/ (167 modules)
npm run typecheck:zod    # tsc over zod/**  -> 0 errors
```

Runtime-verified: string-enum member access + `Object.values`, object-enum named
access **and** correct validation, recursive-schema parse, `.strict()` extra-prop
rejection.

## Goal

Replace hand-written JSON Schema (`json-definitions/`) as the source of truth with
Zod schemas. Derive TypeScript types from `z.infer` instead of
`json-schema-to-typescript`, and validate at runtime with `.safeParse` instead of
ajv `isValidObject`. Ultimately drop the `json-schemas/` (dereferenced JSON Schema)
output entirely.

## Direction note

`z.toJSONSchema` converts **Zod → JSON Schema** — the *output* direction, only needed
if we kept emitting JSON Schema. Migrating existing schemas *into* Zod is the reverse
and needs custom codegen (prototyped, see below) or `json-schema-to-zod`.

## Consumer blast radius

Measured across the 12 repos that depend on the package (src + tests, excluding
`node_modules`/`dist`):

| Signal | Count |
| --- | --- |
| Import lines from the package | ~1211 |
| Enum imports | 403 |
| `isValidObject` runtime-validation sites | 6 |

Most imports are **type** imports of `SomeSchema`. Enum symbols are used overwhelmingly
as **runtime values**:

- `Enum.MEMBER` member access — thousands of sites (`VehicleTypes` 481, `TestResults`
  331, `VehicleType` 149, `EUVehicleCategory` 97, `ApprovalType` 86, `TestStatus` 70,
  `ADRDangerousGood` 72, …).
- `Object.values/keys/entries(Enum)` — needs the runtime enum object.

**Neither pattern works on a `z.infer` union type.** Therefore:

> Enum files MUST continue to be emitted as real TypeScript `export enum`
> declarations. Zod references them via `z.enum(NativeEnum)`. Replacing enums with
> bare `z.enum([...])` unions would break ~2000+ call sites — do not do it.

With that rule, the mitigation is: keep the **same package subpath export map**
(`types/v1/...`, `types/v1/enums/...`), re-export `z.infer` types under identical
names, keep enums as real `enum`s. Result: ~1205 of 1211 imports change zero lines.
Only the **6 `isValidObject` sites** must be hand-migrated to `.safeParse`.

## Converter prototype

`scripts/generateZod.mjs` walks `json-definitions/` and emits one Zod module per file
under `zod/`, mirroring the tree. All **167 files generate and the whole `zod/` tree
typechecks with 0 errors** (`tsconfig.zod.json`). Handles:

- `object` (+ `additionalProperties:false` → `.strict()`), `array`, `string`
  (+ `pattern` → `.regex()`, `format:date-time` → `.datetime()`), `integer`/`number`,
  `boolean`, `null`
- `anyOf`/`oneOf` → `z.union`, `allOf` → `z.intersection`, `const` → `z.literal`
- string `enum` + `tsEnumNames` → real `export enum` + `z.enum(Enum)`
- `$ref` → import; **referenced symbol name comes from the target's `title`**, not the
  filename (all `index.json` files would otherwise collide as `IndexSchema`).

Two bugs found and fixed during the spike: enum type-alias name collision
(`export enum X` + `export type X`), and the `$ref`/`index.json` naming above.

## Object-valued enums — solved (do NOT use `z.literal(object)`)

`hazardClassification.enum.json` (and other `tsEnumNames` cases — 61 total) model the
`enum` as an array of **objects** `{code, description}` with `tsEnumNames` `_1.._9`.
The current package publishes these as a named const map + a union type:

```ts
export declare const HazardClassification: { _1: { code: "1"; description: "Explosive" }; ... };
export type HazardClassification = (typeof HazardClassification)[keyof typeof HazardClassification];
```

`z.literal(object)` **compiles but rejects all input** (identity comparison) — a silent
trap; do not use it. The generator emits a const map plus a schema that **derives its
membership check from that same map**, so the two cannot drift once the generator is
removed and Zod becomes the hand-edited source (runtime-verified):

```ts
export const HazardClassification = { "_1": {"code":"1","description":"Explosive"}, ... } as const;
export type HazardClassification = (typeof HazardClassification)[keyof typeof HazardClassification];
export const HazardClassificationSchema = z.custom<HazardClassification>((value) =>
  value != null && typeof value === 'object' &&
  Object.values(HazardClassification).some((member) =>
    Object.keys(member).length === Object.keys(value).length &&
    Object.entries(member).every(([key, val]) => (value as Record<string, unknown>)[key] === val)));
```

Named access (`HazardClassification._1`) and the exact type are preserved; the schema
accepts exact members and rejects wrong values, extra keys, and non-members.

## Naming contract (keeps consumer imports intact)

- Object schemas: `export const VehicleSchema = z.object(...)` **and**
  `export type VehicleSchema = z.infer<typeof VehicleSchema>` — value and type share the
  identifier (TS keeps the namespaces separate), so existing `import { VehicleSchema }`
  type imports resolve unchanged, and a runtime validator now exists too.
- String enums are emitted as `export const X = {…} as const` (not `enum` — erasable,
  tree-shakeable, no IIFE runtime); the validator is `export const XSchema = z.enum(X)`,
  derived from the same const. `X.MEMBER` and `Object.values(X)` still work; the type
  goes from nominal enum to structural union (looser, non-breaking direction).
- Titles already ending in `Schema` are not double-suffixed.

## Known source-data issue surfaced

`psv-brakes.ignore.json` has a `$ref` to `../../../enums/retarderBrake.ignore.json`,
which resolves to a non-existent path (`v3/enums/…` vs the real
`v3/tech-record/enums/…`). It only "works" today because that ignore file is never
dereferenced. The generator warns and falls back to `z.unknown()`. Worth fixing the
source ref regardless of this migration.

## Recommended rollout — two majors, not big-bang

1. **v18** — add Zod schemas alongside the existing pipeline. Keep `json-schemas/` +
   ajv + generated types. Consumers adopt Zod at their own pace. Migrate the 6
   `isValidObject` sites.
2. **v19** — delete `json-definitions` JSON Schema source, `json-schemas/` output,
   ajv, and the `generateSchemas.ts` regex hacks once no consumer imports them.

A single big-bang major breaks every DVSA app on the same day.

## Minor notes

- `z.number().int()` emits noisy `minimum/maximum: ±9007199254740991` if we ever call
  `z.toJSONSchema` — cosmetic only.
- Casing-duplicate enum symbols exist across consumers (`HgvTyreUseCode` vs
  `HGVTyreUseCode`, `EUVehicleCategoryTrl` vs `EUVehicleCategoryTRL`) — unrelated
  cleanup opportunity.
- Zod version spiked against: 4.4.3.
