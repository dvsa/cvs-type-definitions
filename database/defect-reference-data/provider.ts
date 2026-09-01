import { Logger } from '@aws-lambda-powertools/logger';
import { DB, FEAT_FLAGS, LOGGER } from '@domain/di-tokens/Tokens';
import { Timed } from '@dvsa/appdev-api-common/http/decorators';
import type { DefectDetailsSchema } from '@dvsa/cvs-type-definitions/types/v1/defect-details';
import { NotFoundError } from 'routing-controllers';
import { Container, Service } from 'typedi';

@Service()
export class DefectProvider {
    private readonly logger: Logger = Container.get(LOGGER);

    private get db() {
        return Container.get(DB);
    }

    private get featFlags() {
        return Container.get(FEAT_FLAGS);
    }

    @Timed()
    async findAll(): Promise<DefectDetailsSchema[]> {
        const categories = await this.db.query.defectCategory.findMany({
            with: {
                items: {
                    with: {
                        deficiencies: true,
                    },
                },
            },
        });

        if (!categories.length) {
            throw new NotFoundError('No defects found');
        }

        const data = this.flatten(categories);

        if (this.featFlags.specialistDefects?.enabled) {
            return data;
        }

        const adasImNumbersSet = new Set(this.featFlags.specialistDefects?.adasImNumbers ?? []);

        this.logger.debug('ADAS IM Numbers to filter out:', { adasImNumbers: Array.from(adasImNumbersSet) });

        return data.filter((defect) => !adasImNumbersSet.has(defect.imNumber));
    }

    private flatten(
        categories: { imNumber: number; imDescription: string; additionalInfo: Record<string, unknown> | null; items: { itemNumber: number; itemDescription: string; deficiencies: { ref: string; deficiencyId: string | null; deficiencySubId: string | null; deficiencyCategory: string; deficiencyText: string | null; stdForProhibition: boolean }[] }[] }[],
    ): DefectDetailsSchema[] {
        const result: DefectDetailsSchema[] = [];

        for (const category of categories) {
            const additionalInfo = category.additionalInfo ?? {};

            for (const item of category.items) {
                for (const deficiency of item.deficiencies) {
                    result.push({
                        imNumber: category.imNumber,
                        imDescription: category.imDescription,
                        itemNumber: item.itemNumber,
                        itemDescription: item.itemDescription,
                        deficiencyRef: deficiency.ref,
                        deficiencyId: deficiency.deficiencyId ?? null,
                        deficiencySubId: deficiency.deficiencySubId ?? null,
                        deficiencyCategory: deficiency.deficiencyCategory,
                        deficiencyText: deficiency.deficiencyText ?? null,
                        stdForProhibition: deficiency.stdForProhibition,
                        prs: null,
                        prohibitionIssued: null,
                        additionalInformation: {
                            location: {
                                vertical: null,
                                horizontal: null,
                                lateral: null,
                                longitudinal: null,
                                rowNumber: null,
                                seatNumber: null,
                                axleNumber: null,
                            },
                            notes: '',
                        },
                        metadata: {
                            category: {
                                additionalInfo: additionalInfo as DefectDetailsSchema['metadata']['category']['additionalInfo'],
                            },
                        },
                    });
                }
            }
        }

        return result.sort((a, b) => a.imNumber - b.imNumber);
    }
}
