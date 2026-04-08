import { DB, FEAT_FLAGS, LOGGER } from '@domain/di-tokens/Tokens';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import type { GETTestTypeSchema } from '@dvsa/cvs-type-definitions/types/test-type/get';
import { NotFoundError } from 'routing-controllers';
import { Container, Service } from 'typedi';

@Service()
export class TestTypeProvider {
    private readonly logger = Container.get(LOGGER);

    private get db() {
        return Container.get(DB);
    }

    private get featFlags() {
        return Container.get(FEAT_FLAGS);
    }

    @Timed()
    async findAll(): Promise<GETTestTypeSchema[]> {
        const rows = await this.db.query.testType.findMany({
            with: {
                testCodes: true,
                relationships: {
                    with: { relatedTestType: true },
                },
            },
        });

        if (!rows.length) {
            throw new NotFoundError('No test types found');
        }

        return this.buildTree(rows);
    }

    private buildTree(
        rows: { id: string; parentId: string | null; sortId: string | null; name: string; testTypeName: string | null; typeOfTest: string | null; testTypeClassification: string | null; suggestedTestTypeDisplayName: string | null; suggestedTestTypeDisplayOrder: string | null; forVehicleType: string[] | null; forVehicleSize: string[] | null; forVehicleConfiguration: string[] | null; forVehicleAxles: number[] | null; forEuVehicleCategory: string[] | null; forVehicleClass: string[] | null; forVehicleSubclass: string[] | null; forVehicleWheels: number[] | null; forProvisionalStatus: boolean | null; forProvisionalStatusOnly: boolean | null; testCodes: { defaultTestCode: string; linkedTestCode: string | null; forVehicleType: string | null; forVehicleSize: string | null; forVehicleConfiguration: string[] | null; forVehicleAxles: number[] | null; forEuVehicleCategory: string[] | null; forVehicleClass: string | null; forVehicleSubclass: string[] | null; forVehicleWheels: number[] | null; forProvisionalStatus: boolean | null; forProvisionalStatusOnly: boolean | null }[]; relationships: { relatedTestTypeId: string; relationshipType: string }[] }[],
    ): GETTestTypeSchema[] {
        const mapped = new Map<string, GETTestTypeSchema>();

        // First pass: convert each flat row to GETTestTypeSchema
        for (const row of rows) {
            const linkedIds = row.relationships
                .filter((r) => r.relationshipType === 'linked')
                .map((r) => r.relatedTestTypeId);

            const suggestedTestTypeIds = row.relationships
                .filter((r) => r.relationshipType === 'suggested')
                .map((r) => r.relatedTestTypeId);

            mapped.set(row.id, {
                id: row.id,
                sortId: row.sortId ?? '',
                linkedIds: linkedIds.length ? linkedIds : null,
                suggestedTestTypeIds,
                name: row.name,
                testTypeName: row.testTypeName ?? '',
                typeOfTest: row.typeOfTest ?? undefined,
                suggestedTestTypeDisplayName: row.suggestedTestTypeDisplayName ?? '',
                suggestedTestTypeDisplayOrder: row.suggestedTestTypeDisplayOrder ?? '',
                forVehicleType: row.forVehicleType ?? [],
                forVehicleSize: row.forVehicleSize ?? null,
                forVehicleConfiguration: row.forVehicleConfiguration ?? null,
                forVehicleAxles: row.forVehicleAxles ?? null,
                forEuVehicleCategory: row.forEuVehicleCategory ?? null,
                forVehicleClass: row.forVehicleClass ?? null,
                forVehicleSubclass: row.forVehicleSubclass ?? null,
                forVehicleWheels: row.forVehicleWheels ?? null,
                forProvisionalStatus: row.forProvisionalStatus ?? false,
                forProvisionalStatusOnly: row.forProvisionalStatusOnly ?? false,
                testTypeClassification: row.testTypeClassification ?? undefined,
                testCodes: row.testCodes.length
                    ? row.testCodes.map((tc) => ({
                        defaultTestCode: tc.defaultTestCode,
                        linkedTestCode: tc.linkedTestCode ?? null,
                        forVehicleType: tc.forVehicleType ?? '',
                        forVehicleSize: tc.forVehicleSize ?? null,
                        forVehicleConfiguration: tc.forVehicleConfiguration ?? null,
                        forVehicleAxles: tc.forVehicleAxles ?? null,
                        forEuVehicleCategory: tc.forEuVehicleCategory ?? null,
                        forVehicleClass: tc.forVehicleClass ?? null,
                        forVehicleSubclass: tc.forVehicleSubclass ?? null,
                        forVehicleWheels: tc.forVehicleWheels ?? null,
                        forProvisionalStatus: tc.forProvisionalStatus ?? false,
                        forProvisionalStatusOnly: tc.forProvisionalStatusOnly ?? false,
                    }))
                    : undefined,
                nextTestTypesOrCategories: [],
            } as GETTestTypeSchema);
        }

        // Second pass: build parent-child hierarchy
        const roots: GETTestTypeSchema[] = [];

        for (const row of rows) {
            const node = mapped.get(row.id)!;

            if (row.parentId && mapped.has(row.parentId)) {
                const parent = mapped.get(row.parentId)!;
                (parent.nextTestTypesOrCategories as GETTestTypeSchema[]).push(node);
            } else {
                roots.push(node);
            }
        }

        // Clean up empty nextTestTypesOrCategories
        for (const node of mapped.values()) {
            if ((node.nextTestTypesOrCategories as GETTestTypeSchema[])?.length === 0) {
                node.nextTestTypesOrCategories = undefined;
            }
        }

        return roots;
    }
}
