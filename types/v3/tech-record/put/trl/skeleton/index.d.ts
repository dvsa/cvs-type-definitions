/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TC2Types = "initial";
export type FrameDescription =
  | "Channel section"
  | "Space frame"
  | "I section"
  | "Tubular"
  | "Frame section"
  | "Other"
  | "integral"
  | "Box section"
  | "U section";
export type LetterTypes = "trailer acceptance" | "trailer rejection";
export type ParagraphIds = 3 | 4 | 5 | 6 | 7;
export type MicrofilmDocumentType =
  | "PSV Miscellaneous"
  | "AAT - Trailer Annual Test"
  | "AIV - HGV International App"
  | "COIF Modification"
  | "Trailer COC + Int Plate"
  | "RCT - Trailer Test Cert paid"
  | "HGV COC + Int Plate"
  | "PSV Carry/Auth"
  | "OMO Report"
  | "AIT - Trailer International App"
  | "IPV - HGV EEC Plate/Cert"
  | "XCV - HGV Test Cert free"
  | "AAV - HGV Annual Test"
  | "COIF Master"
  | "Tempo 100 Sp Ord"
  | "Deleted"
  | "PSV N/ALT"
  | "XPT - Tr Plating Cert paid"
  | "FFV - HGV First Test"
  | "Repl Vitesse 100"
  | "TCV - HGV Test Cert"
  | "ZZZ - Miscellaneous"
  | "Test Certificate"
  | "XCT - Trailer Test Cert free"
  | "C52 - COC and VTG52A"
  | "Tempo 100 Report"
  | "Main File Amendment"
  | "PSV Doc"
  | "PSV COC"
  | "PSV Repl COC"
  | "TAV - COC"
  | "NPT - Trailer Alteration"
  | "OMO Certificate"
  | "PSV Repl COIF"
  | "PSV Repl COF"
  | "COIF Application"
  | "XPV - HGV Plating Cert Free"
  | "TCT - Trailer Test Cert"
  | "Tempo 100 App"
  | "PSV Decision on N/ALT"
  | "Special Order PSV"
  | "NPV - HGV Alteration"
  | "No Description Found"
  | "Vitesse 100 Sp Ord"
  | "Brake Test Details"
  | "COIF Productional"
  | "RDT - Test Disc Paid"
  | "RCV - HGV Test Cert"
  | "FFT - Trailer First Test"
  | "IPT - Trailer EEC Plate/Cert"
  | "XDT - Test Disc Free"
  | "PRV - HGV Plating Cert paid"
  | "COF Cert"
  | "PRT - Tr Plating Cert paid"
  | "Tempo 100 Permit";
export type PlateReasonForIssue =
  | "Free replacement"
  | "Replacement"
  | "Destroyed"
  | "Provisional"
  | "Original"
  | "Manual";
export type StatusCode = "provisional" | "current" | "archived";
export type FitmentCode = "single" | "double";
export type SpeedCategorySymbol =
  | "a7"
  | "a8"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "p"
  | "q";

export interface TechRecordPUTTRLSkeleton {
  partialVin?: string | null;
  techRecord_approvalType?: ApprovalType | null;
  techRecord_approvalTypeNumber?: string | null;
  techRecord_ntaNumber?: null | string;
  techRecord_variantNumber?: null | string;
  techRecord_variantVersionNumber?: null | string;
  techRecord_adrDetails_documentId?: string;
  techRecord_adrDetails_dangerousGoods?: boolean | null;
  techRecord_adrDetails_vehicleDetails_type?: string | null;
  techRecord_adrDetails_vehicleDetails_usedOnInternationalJourneys?: null | RadioButtonOptions;
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
  techRecord_adrDetails_weight?: number | null;
  techRecord_adrDetails_declarationsSeen?: boolean | null;
  techRecord_adrDetails_m145Statement?: boolean | null;
  techRecord_adrDetails_newCertificateRequested?: boolean | null;
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
  techRecord_adrDetails_tank_tankDetails_tankStatement_select?: null | ADRTankDetailsTankStatementSelect;
  techRecord_adrDetails_tank_tankDetails_tankStatement_statement?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo?: string[] | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productList?: string | null;
  techRecord_adrPassCertificateDetails?: ADRCertificateDetails[] | null;
  techRecord_alterationMarker?: boolean | null;
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_applicationId?: string | null;
  techRecord_authIntoService?: string | null;
  techRecord_batchId?: string | null;
  techRecord_bodyType_code: string;
  techRecord_bodyType_description: string;
  techRecord_brakes_antilockBrakingSystem?: boolean | null;
  techRecord_brakes_dtpNumber?: string | null;
  techRecord_brakes_loadSensingValve?: boolean | null;
  techRecord_centreOfRearmostAxleToRearOfTrl?: number | null;
  techRecord_conversionRefNo?: string | null;
  techRecord_couplingCenterToRearAxleMax?: number | null;
  techRecord_couplingCenterToRearAxleMin?: number | null;
  techRecord_couplingCenterToRearTrlMax?: number | null;
  techRecord_couplingCenterToRearTrlMin?: number | null;
  techRecord_couplingType?: string | null;
  techRecord_departmentalVehicleMarker?: boolean | null;
  techRecord_dimensions_length?: number | null;
  techRecord_dimensions_width?: number | null;
  techRecord_euVehicleCategory?: EUVehicleCategory | null;
  techRecord_firstUseDate?: string | null;
  techRecord_frameDescription?: FrameDescription | null;
  techRecord_frontAxleToRearAxle?: number | null;
  techRecord_functionCode?: string | null;
  techRecord_grossDesignWeight?: number | null;
  techRecord_grossEecWeight?: number | null;
  techRecord_grossGbWeight?: number | null;
  techRecord_letterOfAuth_letterType?: null | LetterTypes;
  techRecord_letterOfAuth_letterDateRequested?: string | null;
  techRecord_letterOfAuth_paragraphId?: null | ParagraphIds;
  techRecord_letterOfAuth_letterIssuer?: string | null;
  techRecord_make?: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_manufacturerDetails?: string | null;
  techRecord_maxLoadOnCoupling?: number | null;
  techRecord_microfilm_microfilmDocumentType?: null | MicrofilmDocumentType;
  techRecord_microfilm_microfilmRollNumber?: string | null;
  techRecord_microfilm_microfilmSerialNumber?: string | null;
  techRecord_model?: string | null;
  techRecord_noOfAxles?: number | null;
  techRecord_plates?: TRLPlates[];
  techRecord_purchaserDetails_address1?: string | null;
  techRecord_purchaserDetails_address2?: string | null;
  techRecord_purchaserDetails_address3?: string | null;
  techRecord_purchaserDetails_emailAddress?: string | null;
  techRecord_purchaserDetails_faxNumber?: string | null;
  techRecord_purchaserDetails_name?: string | null;
  techRecord_purchaserDetails_postCode?: string | null;
  techRecord_purchaserDetails_postTown?: string | null;
  techRecord_purchaserDetails_purchaserNotes?: string | null;
  techRecord_purchaserDetails_telephoneNumber?: string | null;
  techRecord_rearAxleToRearTrl?: number | null;
  techRecord_reasonForCreation: string;
  techRecord_regnDate?: string | null;
  techRecord_roadFriendly?: boolean | null;
  techRecord_statusCode: StatusCode;
  techRecord_suspensionType?: string | null;
  techRecord_tyreUseCode?: TyreUseCode | null;
  techRecord_vehicleClass_description: "trailer";
  techRecord_vehicleConfiguration?: VehicleConfiguration | null;
  techRecord_vehicleType: "trl";
  trailerId?: string;
  vin: string;
  techRecord_hiddenInVta?: boolean;
  techRecord_updateType?: string;
  techRecord_authIntoService_cocIssueDate?: string | null;
  techRecord_manufacturerDetails_address1?: string | null;
  techRecord_manufacturerDetails_address2?: string | null;
  techRecord_manufacturerDetails_address3?: string | null;
  techRecord_manufacturerDetails_emailAddress?: string | null;
  techRecord_manufacturerDetails_faxNumber?: string | null;
  techRecord_manufacturerDetails_name?: string | null;
  techRecord_manufacturerDetails_postCode?: string | null;
  techRecord_manufacturerDetails_postTown?: string | null;
  techRecord_manufacturerDetails_manufacturerNotes?: string | null;
  techRecord_manufacturerDetails_telephoneNumber?: string | null;
  techRecord_authIntoService_dateReceived?: string | null;
  techRecord_dimensions_axleSpacing?: AxleSpacing[];
  techRecord_authIntoService_datePending?: string | null;
  techRecord_notes?: string | null;
  techRecord_authIntoService_dateAuthorised?: string | null;
  techRecord_authIntoService_dateRejected?: string | null;
  techRecord_axles?: null | TRLAxles[];
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
export interface ADRCertificateDetails {
  createdByName: string;
  certificateType: ADRCertificateTypes;
  generatedTimestamp: string;
  certificateId: string;
}
export interface TRLPlates {
  plateSerialNumber?: string | null;
  plateIssueDate?: string | null;
  plateReasonForIssue?: null | PlateReasonForIssue;
  plateIssuer?: string | null;
}
export interface AxleSpacing {
  axles?: string;
  value?: number | null;
}
export interface TRLAxles {
  parkingBrakeMrk?: boolean | null;
  axleNumber?: number | null;
  brakes_brakeActuator?: null | number;
  brakes_leverLength?: null | number;
  brakes_springBrakeParking?: null | boolean;
  weights_gbWeight?: number | null;
  weights_eecWeight?: number | null;
  weights_designWeight?: number | null;
  weights_ladenWeight?: number | null;
  weights_kerbWeight?: number | null;
  tyres_tyreCode?: number | null;
  tyres_tyreSize?: string | null;
  tyres_plyRating?: string | null;
  tyres_fitmentCode?: null | FitmentCode;
  tyres_dataTrAxles?: null | number;
  tyres_speedCategorySymbol?: SpeedCategorySymbol | null;
}

export enum ApprovalType {
  NTA = "NTA",
  ECTA = "ECTA",
  IVA = "IVA",
  NSSTA = "NSSTA",
  ECSSTA = "ECSSTA",
  GB_WVTA = "GB WVTA",
  UKNI_WVTA = "UKNI WVTA",
  EU_WVTA_PRE_23 = "EU WVTA Pre 23",
  EU_WVTA_23_ON = "EU WVTA 23 on",
  QNIG = "QNIG",
  PROV_GB_WVTA = "Prov.GB WVTA",
  SMALL_SERIES_NKSXX = "Small series NKSXX",
  SMALL_SERIES_NKS = "Small series NKS",
  IVA_VCA = "IVA - VCA",
  IVA_DVSA_NI = "IVA - DVSA/NI"
}
export enum RadioButtonOptions {
  yes = "yes",
  no = "no",
  not_applicable = "n/a"
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
export enum ADRTankDetailsTankStatementSelect {
  STATEMENT = "Statement",
  PRODUCT_LIST = "Product list"
}
export enum ADRCertificateTypes {
  PASS = "PASS",
  REPLACEMENT = "REPLACEMENT"
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
export enum TyreUseCode {
  _2R = "2R",
  _2B = "2B",
  _2J = "2J",
  _2M = "2M"
}
export enum VehicleConfiguration {
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
