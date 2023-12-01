/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TC2Types = "initial";
export type TC3Types = "intermediate" | "periodic" | "exceptional";
export type FitmentCode = "single" | "double";
export type FuelPropulsionSystem =
  | "DieselPetrol"
  | "Diesel"
  | "Petrol"
  | "Hybrid"
  | "Electric"
  | "CNG"
  | "Fuel cell"
  | "LNG"
  | "Other";
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

export interface TechRecordPUTHGVComplete {
  secondaryVrms?: string[];
  partialVin?: string | null;
  techRecord_adrDetails_dangerousGoods?: boolean | null;
  techRecord_adrDetails_vehicleDetails_type?: string | null;
  techRecord_adrDetails_vehicleDetails_approvalDate?: string | null;
  techRecord_adrDetails_permittedDangerousGoods?: string[] | null;
  techRecord_adrDetails_compatibilityGroupJ?: null | ADRCompatibilityGroupJ;
  techRecord_adrDetails_additionalExaminerNotes?: string | null;
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
  techRecord_alterationMarker?: boolean | null;
  techRecord_applicantDetails_name: string;
  techRecord_applicantDetails_address1: string;
  techRecord_applicantDetails_address2: string;
  techRecord_applicantDetails_postTown: string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_applicationId?: null | string;
  /**
   * @minItems 1
   */
  techRecord_axles: [HGVAxles, ...HGVAxles[]];
  techRecord_bodyType_code: string;
  techRecord_bodyType_description: string;
  techRecord_brakes_dtpNumber: string;
  techRecord_brakes_loadSensingValve?: boolean | null;
  techRecord_conversionRefNo?: string | null;
  techRecord_departmentalVehicleMarker?: boolean | null;
  techRecord_dimensions_axleSpacing?: AxleSpacing[];
  techRecord_dimensions_length: number;
  techRecord_dimensions_width: number;
  techRecord_drawbarCouplingFitted: boolean;
  techRecord_emissionsLimit?: null | number;
  techRecord_euroStandard: string;
  techRecord_euVehicleCategory: EUVehicleCategory;
  techRecord_frontAxleToRearAxle: number;
  techRecord_frontAxleTo5thWheelMin: number;
  techRecord_frontAxleTo5thWheelMax: number;
  techRecord_frontVehicleTo5thWheelCouplingMin?: number | null;
  techRecord_frontVehicleTo5thWheelCouplingMax?: number | null;
  techRecord_fuelPropulsionSystem: FuelPropulsionSystem;
  techRecord_functionCode?: string | null;
  techRecord_grossDesignWeight: number;
  techRecord_grossEecWeight?: number | null;
  techRecord_grossGbWeight: number;
  techRecord_make: string;
  techRecord_maxTrainGbWeight: number;
  techRecord_maxTrainEecWeight?: number | null;
  techRecord_maxTrainDesignWeight?: number | null;
  techRecord_manufactureYear: number;
  techRecord_microfilm_microfilmDocumentType?: null | MicrofilmDocumentType;
  techRecord_microfilm_microfilmRollNumber?: string | null;
  techRecord_microfilm_microfilmSerialNumber?: string | null;
  techRecord_model: string;
  techRecord_noOfAxles?: number | null;
  techRecord_notes: string;
  techRecord_offRoad: boolean;
  techRecord_plates?: null | HGVPlates[];
  techRecord_reasonForCreation: string;
  techRecord_regnDate: string;
  techRecord_roadFriendly: boolean;
  techRecord_statusCode: StatusCode;
  techRecord_speedLimiterMrk: boolean;
  techRecord_tachoExemptMrk: boolean;
  techRecord_trainDesignWeight?: number | null;
  techRecord_trainEecWeight?: number | null;
  techRecord_trainGbWeight: number;
  techRecord_tyreUseCode: TyreUseCode;
  techRecord_vehicleClass_description: "heavy goods vehicle";
  techRecord_vehicleConfiguration: VehicleConfiguration;
  techRecord_approvalType: ApprovalType;
  techRecord_approvalTypeNumber?: string | null;
  techRecord_ntaNumber?: string | null;
  techRecord_variantNumber?: string | null;
  techRecord_variantVersionNumber?: string | null;
  techRecord_vehicleType: "hgv";
  primaryVrm?: null | string;
  vin: string;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_updateType?: null | string;
}
export interface TC3Details {
  tc3Type?: null | TC3Types;
  tc3PeriodicNumber?: string | null;
  tc3PeriodicExpiryDate?: string | null;
}
export interface HGVAxles {
  parkingBrakeMrk?: boolean;
  axleNumber?: number;
  weights_gbWeight: number;
  weights_designWeight: number;
  weights_eecWeight?: number | null;
  tyres_tyreCode: number;
  tyres_tyreSize: string;
  tyres_plyRating?: string | null;
  tyres_fitmentCode: FitmentCode;
  tyres_dataTrAxles?: null | number;
}
export interface AxleSpacing {
  axles?: string;
  value?: number | null;
}
export interface HGVPlates {
  plateSerialNumber?: string | null;
  plateIssueDate?: string | null;
  plateReasonForIssue?: null | PlateReasonForIssue;
  plateIssuer?: string | null;
}

export enum ADRCompatibilityGroupJ {
  I = "I",
  E = "E"
}
export enum EUVehicleCategory {
  N1 = "n1",
  N2 = "n2",
  N3 = "n3"
}
export enum TyreUseCode {
  _2R = "2R",
  _2B = "2B"
}
export enum VehicleConfiguration {
  RIGID = "rigid",
  ARTICULATED = "articulated"
}
export enum ApprovalType {
  NTA = "NTA",
  ECTA = "ECTA",
  IVA = "IVA",
  NSSTA = "NSSTA",
  ECSSTA = "ECSSTA",
  GB_WVTA = "GB WVTA",
  PROV_GB_WVTA = "Prov.GB WVTA",
  SMALL_SERIES_NKSXX = "Small series NKSXX",
  SMALL_SERIES_NKS = "Small series NKS",
  IVA_VCA = "IVA - VCA",
  IVA_DVSA_NI = "IVA - DVSA/NI"
}
