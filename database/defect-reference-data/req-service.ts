import { Logger } from '@aws-lambda-powertools/logger';
import { LOGGER } from '@domain/di-tokens/Tokens';
import type { ITaxonomySectionRequiredStandards } from '@domain/models/required-standards/ITaxonomySectionRequiredStandards';
import type { IRequiredStandard } from '@domain/models/required-standards/RequiredStandard';
import { EUVehicleCategory } from '@dvsa/cvs-type-definitions/types/required-standards/defects/enums/euVehicleCategory.enum';
import type {
    DefectGETRequiredStandards,
    InspectionType,
    RequiredStandard,
    RequiredStandardTaxonomySection,
} from '@dvsa/cvs-type-definitions/types/required-standards/defects/get';
import { RequiredStandardsProvider } from '@providers/RequiredStandardsProvider';
import { Container, Inject, Service } from 'typedi';

@Service()
export class RequiredStandardsService {
    private readonly logger: Logger = Container.get(LOGGER);
    private static cachedRequiredStandards = new Map<EUVehicleCategory, ITaxonomySectionRequiredStandards[]>();

    constructor(@Inject() private readonly requiredStandardsProvider: RequiredStandardsProvider) {}

    async getByEUVehicleCategory(euVehicleCategory: EUVehicleCategory): Promise<DefectGETRequiredStandards> {
        if (!RequiredStandardsService.cachedRequiredStandards.get(euVehicleCategory)) {
            this.logger.debug(`Required standards not cached for ${euVehicleCategory}, fetching from provider`);

            RequiredStandardsService.cachedRequiredStandards.set(
                euVehicleCategory,
                await this.requiredStandardsProvider.findByEUVehicleCategory(euVehicleCategory)
            );
        } else {
            this.logger.debug(`Required standards returned from static cache for ${euVehicleCategory}`);
        }

        const requiredStandards = RequiredStandardsService.cachedRequiredStandards.get(
            euVehicleCategory
        ) as ITaxonomySectionRequiredStandards[];

        return {
            euVehicleCategories: [euVehicleCategory],
            basic: this.formatSections(requiredStandards, ({ basicInspection }) => basicInspection),
            normal: this.formatSections(
                requiredStandards,
                ({ normalInspection, basicInspection }) => normalInspection || (!normalInspection && !basicInspection)
            ),
        };
    }

    private formatSections(
        results: ITaxonomySectionRequiredStandards[],
        filterExpression: (x: IRequiredStandard) => boolean
    ): RequiredStandardTaxonomySection[] {
        // loop over the results
        return results.flatMap(({ requiredStandards, sectionDescription, sectionNumber }) => {
            const standards = requiredStandards
                // filter based on expression passed in
                .filter(filterExpression)
                // map data into required format
                .map(this.mapRequiredStandard);

            // if no standards found, return empty array to the Array.flat
            if (standards.length === 0) {
                return [];
            }

            // construct the section object
            return {
                sectionNumber,
                sectionDescription,
                requiredStandards: standards,
            };
        });
    }

    private mapRequiredStandard({
                                    rsNumber,
                                    requiredStandard,
                                    refCalculation,
                                    additionalInfo,
                                    basicInspection,
                                    normalInspection,
                                }: IRequiredStandard): RequiredStandard {
        return {
            rsNumber: Number.parseInt(rsNumber, 10),
            requiredStandard,
            refCalculation,
            additionalInfo,
            inspectionTypes: [
                ...(basicInspection ? ['basic'] : []),
                ...(normalInspection ? ['normal'] : []),
            ] as InspectionType[],
        };
    }
}
