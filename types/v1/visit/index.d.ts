/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";
export type InspectionType = "basic" | "normal";

export interface VisitSchema {
  startTime: string;
  endTime: string;
  testStationName: string;
  testStationPNumber: string;
  testStationEmail: string;
  testStationType: string;
  testerName: string;
  testerId: string;
  testerEmail: string;
  tests: CommercialVehicleTestSchema[];
  id?: string;
}
export interface CommercialVehicleTestSchema {
  testResultId?: string;
  startTime: string;
  endTime: string;
  status: "submitted" | "cancelled" | null;
  reasonForCancellation: string;
  vehicles: VehicleSchema[];
}
export interface VehicleSchema {
  systemNumber: string;
  vrm: string;
  vin: string;
  techRecord: TechRecordSchema;
  testResultsHistory?: TestResultSchema[];
  countryOfRegistration?: string;
  euVehicleCategory?: string;
  odometerReading?: string;
  odometerMetric?: string;
  preparerId?: string;
  preparerName?: string;
  testTypes?: TestTypeSchema[];
  /**
   * trailer only
   */
  trailerId?: string;
}
export interface TechRecordSchema {
  bodyType: {
    code: string;
    description: string;
  };
  manufactureYear: number;
  regnDate: string;
  ntaNumber: string;
  conversionRefNo: string;
  speedLimiterMrk: boolean;
  tachoExemptMrk: boolean;
  reasonForCreation: string;
  statusCode: string;
  grossKerbWeight: number;
  grossLadenWeight: number;
  noOfAxles: number;
  brakeCode: string;
  vehicleType: string;
  euVehicleCategory: string;
  axles: AxleSchema[];
  vehicleClass: VehicleClassSchema;
  vehicleSubclass: string[];
  vehicleConfiguration: string;
  recordCompleteness?: string;
  chassisMake?: string;
  chassisModel?: string;
  bodyMake?: string;
  bodyModel?: string;
  vehicleSize?: string;
  coifDate?: string;
  unladenWeight?: number;
  grossGbWeight?: number;
  grossDesignWeight?: number;
  grossUnladenWeight?: number;
  seatsLowerDeck?: number;
  seatsUpperDeck?: number;
  standingCapacity?: number;
  speedRestriction?: number;
  dispensations?: string;
  remarks?: string;
  brakes?: Brake;
  make?: string;
  model?: string;
  functionCode?: string;
  typeUseCode?: string;
  roadFriendly?: boolean;
  drawbarCouplingFitted?: boolean;
  dimensions?: DimensionsSchema;
  notes: string;
  adrDetails?: ADRDetailsSchema;
  trainGbWeight?: number;
  trainDesignWeight?: number;
  maxTrainGbWeight?: number;
  maxTrainDesignWeight?: number;
  euroStandard?: number;
  frontAxleTo5thWheelMin?: number;
  frontAxleTo5thWheelMax?: number;
  frontAxleTo5thWheelCouplingMin?: number;
  frontAxleTo5thWheelCouplingMax?: number;
  firstUseDate?: string;
  maxLoadOnCoupling?: number;
  suspensionType?: string;
  couplingType?: string;
  frontAxleToRearAxle?: number;
  rearAxleToRearTrl?: number;
  couplingCenterToRearAxleMin?: number;
  couplingCenterToRearAxleMax?: number;
  couplingCenterToRearTrlMin?: number;
  couplingCenterToRearTrlMax?: number;
  numberOfWheelsDriven?: number;
}
export interface AxleSchema {
  parkingBrakeMrk?: boolean;
  axleNumber: number;
  weights?: WeightsSchema;
  tyres: TyresSchema;
  brakes?: AxleBrakePropertiesSchema;
}
export interface WeightsSchema {
  kerbWeight?: number;
  ladenWeight?: number;
  gbWeight: number;
  designWeight: number;
}
export interface TyresSchema {
  tyreSize: string;
  plyRating: string;
  fitmentCode: string;
  dataTrPsvAxles?: number;
  tyreCode: number;
  dataTrAxles?: number;
  /**
   * PSV only
   */
  speedCategorySymbol?: string;
}
export interface AxleBrakePropertiesSchema {
  brakeActuator: number;
  leverLength: number;
  springBrakeParking: boolean;
}
export interface VehicleClassSchema {
  code: string;
  description: string;
}
export interface Brake {
  brakeCode?: string;
  dataTrBrakeOne?: string;
  dataTrBrakeTwo?: string;
  dataTrBrakeThree?: string;
  retarderBrakeOne?: string;
  retarderBrakeTwo?: string;
  brakeCodeOriginal?: string;
  brakeForceWheelsNotLocked?: BrakeForceWheel;
  brakeForceWheelsUpToHalfLocked?: BrakeForceWheel;
  dtpNumber?: string;
  loadSensingValve?: boolean;
  antilockBrakingSystem?: boolean;
}
export interface BrakeForceWheel {
  serviceBrakeForce: number;
  secondaryBrakeForce: number;
  parkingBrakeForce: number;
}
export interface DimensionsSchema {
  length: number;
  width: number;
  /**
   * @minItems 1
   * @maxItems 1
   */
  axleSpacing: [
    {
      axles: string;
      value: number;
    }
  ];
}
export interface ADRDetailsSchema {
  vehicleDetails?: {
    type?: string;
    approvalDate?: string;
  };
  listStatementApplicable?: boolean;
  batteryListNumber?: string;
  permittedDangerousGoods?: string[];
  additionalExaminerNotes?: string;
  applicantDetails?: ApplicantDetailsSchema;
  memosApply?: string[];
  additionalNotes?: {
    number?: string[];
    guidanceNotes?: string[];
  };
  adrTypeApprovalNo?: string;
  compatibilityGroupJ?: boolean;
  tank?: TankSchema;
}
export interface ApplicantDetailsSchema {
  name?: string;
  street?: string;
  town?: string;
  city?: string;
  postcode?: string;
}
export interface TankSchema {
  tankDetails?: TankDetailsSchema;
  tankStatement?: TankStatementSchema;
}
export interface TankDetailsSchema {
  tankManufacturer?: string;
  tc2Details?: TC2DetailsSchema;
  tc3Details?: TC3DetailsSchema[];
  yearOfManufacture?: string;
  tankCode?: string;
  specialProvisions?: string;
  tankManufacturerSerialNo?: string;
  tankTypeAppNo?: string;
}
export interface TC2DetailsSchema {
  tc2Type?: string;
  tc2IntermediateApprovalNo?: string;
  tc2IntermediateExpiryDate?: string;
}
export interface TC3DetailsSchema {
  tc3Type?: string;
  tc3IntermediateApprovalNo?: string;
  tc3IntermediateExpiryDate?: string;
}
export interface TankStatementSchema {
  substancesPermitted?: string;
  statement?: string;
  productList?: string;
  productListRefNo?: string;
  productListUnNo?: string[];
}
export interface TestResultSchema {
  testResultId: string;
  testStationName: string | null;
  testStationPNumber: string | null;
  testStationType: TestStationTypes;
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
  odometerReadingUnits?: OdometerReadingUnits | null;
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
  reasonForCreation?: string;
  createdAt?: string | null;
  createdByEmailAddress?: string;
  createdByName?: string;
  createdById?: string;
  lastUpdatedAt?: string | null;
  lastUpdatedByEmailAddress?: string;
  lastUpdatedByName?: string;
  lastUpdatedById?: string;
  shouldEmailCertificate?: string;
  contingencyTestNumber?: string | null;
  typeOfTest?: TypeOfTest;
  source?: TestSources;
  make?: string | null;
  model?: string | null;
  bodyType?: BodyTypeSchema;
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
  code?: string | null;
  description?: string | null;
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
export enum OdometerReadingUnits {
  KILOMETRES = "kilometres",
  MILES = "miles"
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
export enum TypeOfTest {
  CONTINGENCY = "contingency",
  DESK_BASED = "desk-based",
  COMPLETION = "completion"
}
export enum TestSources {
  VTM = "vtm",
  VTA = "vta"
}
