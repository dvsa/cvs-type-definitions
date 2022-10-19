/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
export interface TestTypeSchema {
  testTypeName: string;
  name: string;
  testTypeId: string;
  certificateNumber: string | null;
  secondaryCertificateNumber: string | null;
  testTypeStartTimestamp: string | null;
  testTypeEndTimestamp: string | null;
  testResult: string | null;
  prohibitionIssued: boolean | null;
  reasonForAbandoning: string | null;
  additionalNotesRecorded: string | null;
  additionalCommentsForAbandon: string | null;
  numberOfSeatbeltsFitted?: number | null;
  lastSeatbeltInstallationCheckDate?: string | null;
  seatbeltInstallationCheckDate?: boolean | null;
  testExpiryDate?: string;
  modType?: Index | string | null;
  emissionStandard?: string;
  fuelType?: string;
  modificationTypeUsed?: string;
  smokeTestKLimitApplied?: string;
  particulateTrapFitted?: string;
  particulateTrapSerialNumber?: string;
  defects: DefectDetailsSchema[];
  customDefects?: SpecialistCustomDefectsSchema[];
  completionStatus?: string;
  testTypeCategoryName?: string;
  reasons?: string[];
  testNumber?: string;
  linkedIds?: string[] | null;
}
/**
 * Mod Type Schema
 */
export interface Index {
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
  metadata: {
    category: {
      additionalInfo?: {
        location: DefectLocationMetadataSchema;
        notes: boolean;
      };
    };
  };
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
