import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {
    defectCategory,
    defectDeficiency,
    defectItem,
    requiredStandard,
    requiredStandardSection,
} from './schema';

// ─── Table-level schemas ─────────────────────────────────────────────────────

export const selectDefectCategorySchema = createSelectSchema(defectCategory);
export const insertDefectCategorySchema = createInsertSchema(defectCategory);

export const selectDefectItemSchema = createSelectSchema(defectItem);
export const insertDefectItemSchema = createInsertSchema(defectItem);

export const selectDefectDeficiencySchema = createSelectSchema(defectDeficiency);
export const insertDefectDeficiencySchema = createInsertSchema(defectDeficiency);

export const selectRequiredStandardSectionSchema = createSelectSchema(requiredStandardSection);
export const insertRequiredStandardSectionSchema = createInsertSchema(requiredStandardSection);

export const selectRequiredStandardSchema = createSelectSchema(requiredStandard);
export const insertRequiredStandardSchema = createInsertSchema(requiredStandard);

// ─── Re-exports from types ─────────────────────────────────────────────────

export {
    defectDetailsSchema,
    defectLocationSchema,
    defectMetadataSchema,
    type DefectDetailsSchema,
    type DefectLocationSchema,
    type DefectMetadataSchema,
} from '../../types/v1/defect-details';

export { mediaSchema, type MediaSchema } from '../../types/v1/media';

export {
    defectGETRequiredStandardsSchema,
    requiredStandardResponseSchema,
    requiredStandardTaxonomySectionSchema,
    type DefectGETRequiredStandards,
    type RequiredStandard,
    type RequiredStandardTaxonomySection,
} from '../../types/required-standards/defects/get';
