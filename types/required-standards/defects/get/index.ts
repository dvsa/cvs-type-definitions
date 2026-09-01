import { z } from 'zod';
import { euVehicleCategoryEnum, inspectionTypeEnum } from '../../../enums';
export { euVehicleCategoryEnum, type EUVehicleCategory, inspectionTypeEnum, type InspectionType } from '../../../enums';

export const requiredStandardResponseSchema = z.object({
    rsNumber: z.number(),
    requiredStandard: z.string(),
    refCalculation: z.string(),
    additionalInfo: z.boolean(),
    inspectionTypes: z.array(inspectionTypeEnum),
});

export const requiredStandardTaxonomySectionSchema = z.object({
    sectionNumber: z.string(),
    sectionDescription: z.string(),
    requiredStandards: z.array(requiredStandardResponseSchema),
});

export const defectGETRequiredStandardsSchema = z.object({
    euVehicleCategories: z.array(euVehicleCategoryEnum),
    basic: z.array(requiredStandardTaxonomySectionSchema),
    normal: z.array(requiredStandardTaxonomySectionSchema),
});

export type RequiredStandard = z.infer<typeof requiredStandardResponseSchema>;
export type RequiredStandardTaxonomySection = z.infer<typeof requiredStandardTaxonomySectionSchema>;
export type DefectGETRequiredStandards = z.infer<typeof defectGETRequiredStandardsSchema>;
