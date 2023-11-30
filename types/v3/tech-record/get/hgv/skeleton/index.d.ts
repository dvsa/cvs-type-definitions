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

export interface TechRecordGETHGVSkeleton {
  secondaryVrms?: null | string[];
  createdTimestamp: string;
  partialVin: string;
  systemNumber: string;
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
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_applicationId?: string | null;
  techRecord_axles?: null | HGVAxles[];
  techRecord_bodyType_code?: null | string;
  techRecord_bodyType_description: string;
  techRecord_brakes_dtpNumber?: string | null;
  techRecord_brakes_loadSensingValve?: boolean | null;
  techRecord_conversionRefNo?: string | null;
  techRecord_createdAt: string;
  techRecord_createdById: string;
  techRecord_createdByName: string;
  techRecord_departmentalVehicleMarker?: boolean | null;
  techRecord_dimensions_axleSpacing?: AxleSpacing[];
  techRecord_dimensions_length?: number | null;
  techRecord_dimensions_width?: number | null;
  techRecord_drawbarCouplingFitted?: boolean | null;
  techRecord_emissionsLimit?: null | number;
  techRecord_euroStandard?: string | null;
  techRecord_euVehicleCategory?: EUVehicleCategory | null;
  techRecord_frontAxleToRearAxle?: number | null;
  techRecord_frontAxleTo5thWheelMin?: number | null;
  techRecord_frontAxleTo5thWheelMax?: number | null;
  techRecord_frontVehicleTo5thWheelCouplingMin?: number | null;
  techRecord_frontVehicleTo5thWheelCouplingMax?: number | null;
  techRecord_fuelPropulsionSystem?: FuelPropulsionSystem | null;
  techRecord_functionCode?: string | null;
  techRecord_grossDesignWeight?: number | null;
  techRecord_grossEecWeight?: number | null;
  techRecord_grossGbWeight?: number | null;
  techRecord_make?: string | null;
  techRecord_maxTrainGbWeight?: number | null;
  techRecord_maxTrainEecWeight?: number | null;
  techRecord_maxTrainDesignWeight?: number | null;
  techRecord_manufactureYear?: number | null;
  techRecord_microfilm?: null;
  techRecord_microfilm_microfilmDocumentType?: null | MicrofilmDocumentType;
  techRecord_microfilm_microfilmRollNumber?: string | null;
  techRecord_microfilm_microfilmSerialNumber?: string | null;
  techRecord_model?: string | null;
  techRecord_numberOfWheelsDriven?: number | null;
  techRecord_noOfAxles?: number | null;
  techRecord_notes?: string | null;
  techRecord_offRoad?: boolean | null;
  techRecord_plates?: null | HGVPlates[];
  techRecord_reasonForCreation: string;
  techRecord_recordCompleteness: "skeleton";
  techRecord_regnDate?: string | null;
  techRecord_roadFriendly?: boolean | null;
  techRecord_statusCode: StatusCode;
  techRecord_speedLimiterMrk?: boolean | null;
  techRecord_tachoExemptMrk?: boolean | null;
  techRecord_trainDesignWeight?: number | null;
  techRecord_trainEecWeight?: number | null;
  techRecord_trainGbWeight?: number | null;
  techRecord_tyreUseCode?: TyreUseCode | null;
  techRecord_vehicleClass_code?: "v";
  techRecord_vehicleClass_description: "heavy goods vehicle";
  techRecord_vehicleConfiguration?: VehicleConfiguration | null;
  techRecord_approvalType?: ApprovalType | null;
  techRecord_approvalTypeNumber?: string | null;
  techRecord_ntaNumber?: string | null;
  techRecord_variantNumber?: string | null;
  techRecord_variantVersionNumber?: string | null;
  techRecord_lastUpdatedAt?: string | null;
  techRecord_lastUpdatedByName?: string | null;
  techRecord_lastUpdatedById?: string | null;
  techRecord_vehicleType: "hgv";
  primaryVrm: string;
  vin: string;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_updateType?: null | string;
}
export interface TC3Details {
  tc3Type?: null | TC3Types;
  tc3Type_tc3PeriodicNumber?: string | null;
  tc3Type_tc3PeriodicExpiryDate?: string | null;
}
export interface HGVAxles {
  parkingBrakeMrk?: boolean | null;
  axleNumber?: number | null;
  weights_gbWeight?: number | null;
  weights_designWeight?: number | null;
  weights_eecWeight?: number | null;
  tyres_tyreCode?: number | null;
  tyres_tyreSize?: string | null;
  tyres_plyRating?: string | null;
  tyres_fitmentCode?: null | FitmentCode;
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
