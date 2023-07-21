/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type TC2Types = "initial";
export type TC3Types = "intermediate" | "periodic" | "exceptional";
export type ApprovalType =
  | "NTA"
  | "ECTA"
  | "IVA"
  | "NSSTA"
  | "ECSSTA"
  | "GB WVTA"
  | "UKNI WVTA"
  | "EU WVTA Pre 23"
  | "EU WVTA 23 on"
  | "QNIG"
  | "Prov.GB WVTA"
  | "Small series"
  | "IVA - VCA"
  | "IVA - DVSA/NI";
export type EUVehicleCategory =
  | "m1"
  | "m2"
  | "m3"
  | "n1"
  | "n2"
  | "n3"
  | "o1"
  | "o2"
  | "o3"
  | "o4"
  | "l1e-a"
  | "l1e"
  | "l2e"
  | "l3e"
  | "l4e"
  | "l5e"
  | "l6e"
  | "l7e";
export type EuroStandard =
  | "0.10 g/kWh Euro 3 PM"
  | "0.03 g/kWh Euro IV PM"
  | "Euro 3"
  | "Euro 4"
  | "Euro 5"
  | "Euro 6"
  | "Euro V"
  | "Euro VI"
  | "Full Electric";
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
export type MicrofilmDocumentTypes =
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
  | "ZZZ -  Miscellaneous"
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
  | "TCT  - Trailer Test Cert"
  | "Tempo 100 App"
  | "PSV Decision on N/ALT"
  | "Special Order PSV"
  | "NPV - HGV Alteration"
  | "No Description Found"
  | "Vitesse 100 Sp Ord"
  | "Brake Test Details"
  | "COIF Productional"
  | "RDT - Test Disc Paid"
  | "RCV -  HGV Test Cert"
  | "FFT -  Trailer First Test"
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
export type VehicleClassDescription =
  | "motorbikes over 200cc or with a sidecar"
  | "not applicable"
  | "small psv (ie: less than or equal to 22 seats)"
  | "motorbikes up to 200cc"
  | "trailer"
  | "large psv(ie: greater than 23 seats)"
  | "3 wheelers"
  | "heavy goods vehicle"
  | "MOT class 4"
  | "MOT class 7"
  | "MOT class 5";
export type VehicleConfiguration =
  | "rigid"
  | "articulated"
  | "centre axle drawbar"
  | "semi-car transporter"
  | "semi-trailer"
  | "long semi-trailer"
  | "low loader"
  | "other"
  | "drawbar"
  | "four-in-line"
  | "dolly"
  | "full drawbar";
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

export interface PUTTRLTechnicalRecordV3Complete {
  partialVin: string;
  techRecord_adrDetails_vehicleDetails_type?: string | null;
  techRecord_adrDetails_vehicleDetails_approvalDate?: string | null;
  techRecord_adrDetails_permittedDangerousGoods?: string[] | null;
  techRecord_adrDetails_compatibilityGroupJ?: boolean | null;
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
  techRecord_adrDetails_tank_tankDetails_tc3Details_tc3Type?: null | TC3Types;
  techRecord_adrDetails_tank_tankDetails_tc3Type_tc3PeriodicNumber?: string | null;
  techRecord_adrDetails_tank_tankDetails_tc3Type_tc3PeriodicExpiryDate?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_substancesPermitted?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_statement?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo?: string | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo?: string[] | null;
  techRecord_adrDetails_tank_tankDetails_tankStatement_productList?: string | null;
  techRecord_alterationMarker?: string | null;
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_applicationId?: string | null;
  techRecord_approvalType?: ApprovalType | null;
  techRecord_approvalTypeNumber?: string | null;
  techRecord_authIntoService?: string | null;
  techRecord_batchId?: string | null;
  techRecord_bodyType_code: string;
  techRecord_bodyType_description: string;
  techRecord_brakes_antilockBrakingSystem?: boolean | null;
  techRecord_brakes_dtpNumber?: string | null;
  techRecord_brakes_loadSensingValve?: boolean | null;
  techRecord_centreOfRearmostAxleToRearOfTrl?: number | null;
  techRecord_conversionRefNo?: string | null;
  techRecord_couplingCenterToRearAxleMax: number | null;
  techRecord_couplingCenterToRearAxleMin: number | null;
  techRecord_couplingCenterToRearTrlMax: number | null;
  techRecord_couplingCenterToRearTrlMin: number | null;
  techRecord_couplingType: string | null;
  techRecord_departmentalVehicleMarker?: boolean | null;
  techRecord_dimensions_length: number | null;
  techRecord_dimensions_width: number | null;
  drawbarCouplingFitted?: string;
  techRecord_emissionsLimit?: null | number;
  techRecord_euVehicleCategory?: EUVehicleCategory | null;
  techRecord_euroStandard?: EuroStandard;
  frontAxleTo5thWheelMax?: number | null;
  techRecord_frontAxleTo5thWheelMin?: number | null;
  techRecord_firstUseDate: string | null;
  techRecord_frameDescription?: FrameDescription | null;
  techRecord_frontAxleToRearAxle: number | null;
  techRecord_frontVehicleTo5thWheelCouplingMax?: string | null;
  techRecord_frontVehicleTo5thWheelCouplingMin?: string | null;
  techRecord_fuelPropulsionSystem?: FuelPropulsionSystem;
  techRecord_functionCode?: string | null;
  techRecord_grossDesignWeight?: number | null;
  techRecord_grossEecWeight?: number | null;
  techRecord_grossGbWeight?: number | null;
  techRecord_letterOfAuth?: string | null;
  techRecord_make: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_maxTrainDesignWeight?: number;
  techRecord_maxTrainEecWeight?: number;
  techRecord_maxTrainGbWeight?: number;
  techRecord_manufacturerDetails?: string | null;
  techRecord_maxLoadOnCoupling: number | null;
  techRecord_microfilm?: string | null;
  techRecord_microfilm_microfilmDocumentType?: null | MicrofilmDocumentTypes;
  techRecord_microfilm_microfilmRollNumber?: string | null;
  techRecord_microfilm_microfilmSerialNumber?: string | null;
  techRecord_model: string | null;
  techRecord_noOfAxles: number | null;
  techRecord_notes: string;
  techRecord_ntaNumber?: string;
  techRecord_numberOfWheelsDriven?: number | null;
  techRecord_offRoad?: boolean;
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
  techRecord_rearAxleToRearTrl: number | null;
  techRecord_reasonForCreation: string;
  techRecord_regnDate?: string | null;
  techRecord_roadFriendly: boolean | null;
  techRecord_speedLimiterMrk?: boolean;
  techRecord_statusCode: StatusCode;
  techRecord_tachoExemptMrk?: boolean;
  techRecord_suspensionType: string | null;
  techRecord_tyreUseCode: string | null;
  techRecord_variantNumber?: string;
  techRecord_variantVersionNumber?: string;
  techRecord_vehicleClass_code: string;
  techRecord_vehicleClass_description: VehicleClassDescription;
  techRecord_vehicleConfiguration: VehicleConfiguration | null;
  techRecord_vehicleType: "trl";
  trailerId: string;
  vin: string;
  techRecord_axles?: PSVAxles[];
  techRecord_hiddenInVta?: boolean;
  techRecord_updateType?: string;
}
export interface TRLPlates {
  plateSerialNumber?: string | null;
  plateIssueDate?: string | null;
  reasonForIssue?: null | PlateReasonForIssue;
  plateIssuer?: string | null;
}
export interface PSVAxles {
  parkingBrakeMrk?: boolean | null;
  axleNumber?: number | null;
  brakes?: {
    brakeActuator?: number;
    leverLength?: number;
    springBrakeParking?: boolean;
  };
  weights_gbWeight?: number | null;
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
