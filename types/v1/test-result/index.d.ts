/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";
export type InspectionType = "basic" | "normal";

export interface TestResultSchema {
  testResultId: string;
  testStationName: string | null;
  testStationPNumber: string | null;
  testStationType: TestStationTypes | null;
  testerName: string | null;
  testerStaffId: string;
  testerEmailAddress: string | null;
  testStartTimestamp: string;
  testEndTimestamp: string;
  testStatus: TestStatus;
  reasonForCancellation: string | null;
  systemNumber: string;
  vrm?: string;
  trailerId?: string;
  vin: string;
  vehicleClass: VehicleClassSchema;
  vehicleSubclass?: string[];
  vehicleType: VehicleType;
  vehicleConfiguration: string;
  odometerReading?: number | null;
  odometerReadingUnits?: string | null;
  preparerId: string | null;
  preparerName: string | null;
  euVehicleCategory: EUVehicleCategory;
  countryOfRegistration: string | null;
  noOfAxles: number;
  numberOfWheelsDriven: number | null;
  vehicleSize?: string;
  numberOfSeats?: number;
  regnDate?: string | null;
  firstUseDate?: string | null;
  testTypes: TestTypeSchema[];
  reasonForCreation?: string | null;
  createdAt?: string | null;
  createdByEmailAddress?: string | null;
  createdByName?: string | null;
  createdById?: string | null;
  lastUpdatedAt?: string | null;
  lastUpdatedByEmailAddress?: string | null;
  lastUpdatedByName?: string | null;
  lastUpdatedById?: string | null;
  shouldEmailCertificate?: string | null;
  contingencyTestNumber?: string | null;
  typeOfTest?: TypeOfTest;
  source?: TestSources;
  make?: string | null;
  model?: string | null;
  bodyType?: BodyTypeSchema;
}
export interface VehicleClassSchema {
  code: string;
  description: string;
}
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
    | TestResults1;
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
  customDefects?: SpecialistCustomDefectsSchema[];
  requiredStandards?: SpecialistCustomDefectsSchema1[];
  testNumber?: string | null;
  reapplicationDate?: string | null;
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
export interface SpecialistCustomDefectsSchema1 {
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
export interface BodyTypeSchema {
  code?: string;
  description?: string;
}

export enum TestStationTypes {
  ATF = "atf",
  GVTS = "gvts",
  HQ = "hq",
  POTF = "potf"
}
export enum TestStatus {
  SUBMITTED = "submitted",
  CANCELLED = "cancelled"
}
export enum EUVehicleCategory {
  M1 = "m1",
  M2 = "m2",
  M3 = "m3",
  N1 = "n1",
  N2 = "n2",
  N3 = "n3",
  O1 = "o1",
  O2 = "o2",
  O3 = "o3",
  O4 = "o4",
  L1E_A = "l1e-a",
  l1E = "l1e",
  L2e = "l2e",
  L3E = "l3e",
  L4E = "l4e",
  L5E = "l5e",
  L6E = "l6e",
  L7E = "l7e"
}
export enum TestResults {
  PASS = "pass",
  PRS = "prs",
  FAIL = "fail",
  ABANDONED = "abandoned"
}
export enum TestResults1 {
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
export enum TypeOfTest {
  CONTINGENCY = "contingency",
  DESK_BASED = "desk-based",
  COMPLETION = "completion"
}
export enum TestSources {
  VTM = "vtm",
  VTA = "vta"
}
