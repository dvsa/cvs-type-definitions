import { DB } from '@domain/di-tokens/Tokens';
import type { ITaxonomySectionRequiredStandards } from '@domain/models/required-standards/ITaxonomySectionRequiredStandards';
import { sql } from 'drizzle-orm';
import { EUVehicleCategory } from '@dvsa/cvs-type-definitions/types/required-standards/defects/enums/euVehicleCategory.enum';
import { Container, Service } from 'typedi';
import { requiredStandardSection } from './schema';

@Service()
export class RequiredStandardsProvider {
    private get db() {
        return Container.get(DB);
    }

    async findByEUVehicleCategory(euVehicleCategory: EUVehicleCategory): Promise<ITaxonomySectionRequiredStandards[]> {
        const sections = await this.db.query.requiredStandardSection.findMany({
            where: sql`JSON_CONTAINS(${requiredStandardSection.euVehicleCategories}, ${JSON.stringify(euVehicleCategory)})`,
            with: {
                standards: true,
            },
        });

        return sections.map((section) => ({
            sectionNumber: section.sectionNumber,
            sectionDescription: section.sectionDescription,
            requiredStandards: section.standards.map((std) => {
                const types = (std.inspectionTypes ?? []) as string[];
                return {
                    rsNumber: String(std.rsNumber),
                    requiredStandard: std.requiredStandard,
                    refCalculation: std.refCalculation,
                    additionalInfo: std.additionalInfo,
                    basicInspection: types.includes('basic'),
                    normalInspection: types.includes('normal'),
                };
            }),
        }));
    }
}
