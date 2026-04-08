import { Logger } from '@aws-lambda-powertools/logger';
import { LOGGER } from '@domain/di-tokens/Tokens';
import { DefectDetailsSchema } from '@dvsa/cvs-type-definitions/types/v1/defect-details';
import { DefectProvider } from '@providers/DefectProvider';
import { Container, Inject, Service } from 'typedi';

@Service()
export class DefectService {
    private readonly logger: Logger = Container.get(LOGGER);
    private static cachedDefects: DefectDetailsSchema[] | undefined;

    constructor(@Inject() private readonly defectsProvider: DefectProvider) {}

    async getDefectList(): Promise<DefectDetailsSchema[]> {
        if (!DefectService.cachedDefects) {
            this.logger.debug('Defects not cached, fetching from provider');
            DefectService.cachedDefects = await this.defectsProvider.findAll();
        } else {
            this.logger.debug('Defects returned from static cache');
        }

        return DefectService.cachedDefects;
    }
}
