/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type InspectionType = "basic" | "normal";

export interface TestTypeSchema {
  testTypeName: string | null;
  name: string;
  testTypeId: string;
  certificateNumber: string | null;
  secondaryCertificateNumber: string | null;
  testTypeStartTimestamp: string | null;
  testTypeEndTimestamp: string | null;
  testResult:
    | {
        [k: string]: unknown;
      }
    | TestResults;
  prohibitionIssued: boolean | null;
  reasonForAbandoning: string | null;
  additionalNotesRecorded: string | null;
  additionalCommentsForAbandon: string | null;
  numberOfSeatbeltsFitted?: number | null;
  lastSeatbeltInstallationCheckDate?: string | null;
  seatbeltInstallationCheckDate?: boolean | null;
  testExpiryDate?: string;
  testAnniversaryDate?: string | null;
  modType?: ModTypeSchema | string | null;
  emissionStandard?:
    | {
        [k: string]: unknown;
      }
    | EmissionStandards;
  fuelType?:
    | {
        [k: string]: unknown;
      }
    | FuelType;
  modificationTypeUsed?: string | null;
  smokeTestKLimitApplied?: string | null;
  particulateTrapFitted?: string | null;
  particulateTrapSerialNumber?: string | null;
  defects: DefectDetailsSchema[];
  customDefects?: SpecialistCustomDefectsSchema[] | null;
  requiredStandards?: SpecialistCustomDefectsSchemaPut[];
  testNumber?: string | null;
  reapplicationDate?: string | null;
  testCode?: string | null;
  lastUpdatedAt?:
    | string
    | {
        [k: string]: unknown;
      }
    | null;
  createdAt?:
    | string
    | {
        [k: string]: unknown;
      }
    | null;
  testTypeClassification?: string | null;
  deletionFlag?: string | null;
  centralDocs?: {
    issueRequired: boolean;
    notes?: string;
    reasonsForIssue: string[];
  };
}
export interface ModTypeSchema {
  code: string;
  description: string;
}
export interface DefectDetailsSchema {
  imNumber: number;
  imDescription: string;
  additionalInformation: {
    location: DefectLocationSchema;
    notes: string;
  };
  itemNumber: number;
  itemDescription: string;
  deficiencyRef: string;
  deficiencyId: string | null;
  deficiencySubId: string | null;
  deficiencyCategory: string;
  deficiencyText: string | null;
  stdForProhibition: boolean | null;
  prs: boolean | null;
  prohibitionIssued: boolean | null;
  metadata: DefectMetadataSchema;
}
export interface DefectLocationSchema {
  vertical?: string | null;
  horizontal?: string | null;
  lateral?: string | null;
  longitudinal?: string | null;
  rowNumber?: number | null;
  seatNumber?: number | null;
  axleNumber?: number | null;
}
export interface DefectMetadataSchema {
  category: {
    additionalInfo?: DefectAdditionalDetailsMetadataSchema;
  };
}
export interface DefectAdditionalDetailsMetadataSchema {
  location: DefectLocationMetadataSchema;
  notes: boolean;
}
export interface DefectLocationMetadataSchema {
  vertical?: string[] | null;
  horizontal?: string[] | null;
  lateral?: string[] | null;
  longitudinal?: string[] | null;
  rowNumber?: number[] | null;
  seatNumber?: number[] | null;
  axleNumber?: number[] | null;
}
export interface SpecialistCustomDefectsSchema {
  referenceNumber: string;
  defectName: string;
  defectNotes: string;
  /**
   * FE only
   */
  hasAllMandatoryFields?: boolean;
}
export interface SpecialistCustomDefectsSchemaPut {
  sectionNumber: string;
  sectionDescription: string;
  additionalNotes?: string | null;
  rsNumber: number;
  requiredStandard: string;
  refCalculation: string;
  additionalInfo: boolean;
  inspectionTypes?: InspectionType[];
  prs: boolean;
}

export enum TestResults {
  PASS = "pass",
  PRS = "prs",
  FAIL = "fail",
  ABANDONED = "abandoned"
}
export enum EmissionStandards {
  EURO3_PM = "0.10 g/kWh Euro 3 PM",
  EURO4_PM = "0.03 g/kWh Euro IV PM'",
  EURO3 = "Euro 3",
  EURO4 = "Euro 4",
  EURO5 = "Euro 5",
  EURO6 = "Euro 6",
  EUROV = "Euro V",
  EUROVI = "Euro VI",
  FULL_ELECTRIC = "Full Electric"
}
export enum FuelType {
  DIESEL = "diesel",
  GAS_CNG = "gas-cng",
  GAS_LNG = "gas-lng",
  GAS_LPG = "gas-lpg",
  PETROL = "petrol",
  FUEL_CELL = "fuel cell",
  FULL_ELECTRIC = "full electric"
}
