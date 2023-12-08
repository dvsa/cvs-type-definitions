/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TC2Types = "initial";
export type StatusCode = "provisional" | "current" | "archived";
export type VehicleSubclass = ("n" | "p" | "a" | "s" | "c" | "l" | "t" | "e" | "m" | "r" | "w")[];

export interface TechRecordGETLGVSkeleton {
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_adrDetails_dangerousGoods?: boolean | null;
  techRecord_adrDetails_vehicleDetails_type?: string | null;
  techRecord_adrDetails_vehicleDetails_approvalDate?: string | null;
  techRecord_adrDetails_permittedDangerousGoods?: string[] | null;
  techRecord_adrDetails_compatibilityGroupJ?: null | ADRCompatibilityGroupJ;
  techRecord_adrDetails_additionalExaminerNotes?: AdditionalExaminerNotes[] | null;
  techRecord_adrDetails_applicantDetails_name?: string | null;
  techRecord_adrDetails_applicantDetails_street?: string | null;
  techRecord_adrDetails_applicantDetails_town?: string | null;
  techRecord_adrDetails_applicantDetails_city?: string | null;
  techRecord_adrDetails_applicantDetails_postcode?: string | null;
  techRecord_adrDetails_memosApply?: string[] | null;
  techRecord_adrDetails_documents?: string[] | null;
  techRecord_adrDetails_listStatementApplicable?: boolean | null;
  techRecord_adrDetails_batteryListNumber?: string | null;
  techRecord_adrDetails_brakeDeclarationsSeen?: boolean | null;
  techRecord_adrDetails_brakeDeclarationIssuer?: string | null;
  techRecord_adrDetails_brakeEndurance?: boolean | null;
  techRecord_adrDetails_weight?: string | null;
  techRecord_adrDetails_declarationsSeen?: boolean | null;
  techRecord_adrDetails_additionalNotes_guidanceNotes?: string[] | null;
  techRecord_adrDetails_additionalNotes_number?: string[] | null;
  techRecord_adrDetails_adrTypeApprovalNo?: string | null;
  techRecord_adrDetails_adrCertificateNotes?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankManufacturer?: string | null;
  techRecord_adrDetails_tank_tankDetails_yearOfManufacture?: number | null;
  techRecord_adrDetails_tank_tankDetails_tankManufacturerSerialNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankTypeAppNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankCode?: string | null;
  techRecord_adrDetails_tank_tankDetails_specialProvisions?: string | null;
  techRecord_adrDetails_tank_tankDetails_tc2Details_tc2Type?: null | TC2Types;
  techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate?: string | null;
  techRecord_adrDetails_tank_tankDetails_tc3Details?: TC3Details[] | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_substancesPermitted?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_statement?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo?: string[] | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productList?: string | null;
  createdTimestamp: string;
  partialVin?: null | string;
  primaryVrm?: null | string;
  systemNumber: string;
  techRecord_createdAt: string;
  techRecord_createdById: string;
  techRecord_createdByName: string;
  techRecord_euVehicleCategory?: null | EUVehicleCategory;
  techRecord_lastUpdatedAt?: string | null;
  techRecord_lastUpdatedById?: string | null;
  techRecord_lastUpdatedByName?: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_recordCompleteness?: null | string;
  techRecord_noOfAxles?: null | number;
  techRecord_notes?: null | string;
  techRecord_reasonForCreation: string;
  techRecord_regnDate?: string | null;
  techRecord_statusCode?: null | StatusCode;
  techRecord_vehicleConfiguration?: null | VehicleConfiguration;
  techRecord_vehicleType: "lgv";
  vin: string;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_updateType?: null | string;
  secondaryVrms?: null | string[];
  techRecord_vehicleSubclass?: VehicleSubclass;
}
export interface AdditionalExaminerNotes {
  note?: string | null;
  createdAtDate?: string | null;
  lastUpdatedBy?: string | null;
}
export interface TC3Details {
  tc3Type?: null | TC3Types;
  tc3PeriodicNumber?: string | null;
  tc3PeriodicExpiryDate?: string | null;
}

export enum ADRCompatibilityGroupJ {
  I = "I",
  E = "E"
}
export enum TC3Types {
  INTERMEDIATE = "intermediate",
  PERIODIC = "periodic",
  EXCEPTIONAL = "exceptional"
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
export enum VehicleConfiguration {
  RIGID = "rigid",
  ARTICULATED = "articulated",
  CENTRE_AXLE_DRAWBAR = "centre axle drawbar",
  SEMI_CAR_TRANSPORTER = "semi-car transporter",
  SEMI_TRAILER = "semi-trailer",
  LONG_SEMI_TRAILER = "long semi-trailer",
  LOW_LOADER = "low loader",
  OTHER = "other",
  DRAWBAR = "drawbar",
  FOUR_IN_LINE = "four-in-line",
  DOLLY = "dolly",
  FULL_DRAWBAR = "full drawbar"
}
