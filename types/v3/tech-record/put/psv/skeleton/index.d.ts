/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type StatusCode = "provisional" | "current" | "archived";
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
export type VehicleSize = "small" | "large";
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
export type BodyTypeDescription =
  | "artic"
  | "articulated"
  | "box"
  | "car transporter"
  | "concrete mixer"
  | "curtainsider"
  | "double decker"
  | "flat"
  | "livestock carrier"
  | "low loader"
  | "mini bus"
  | "other"
  | "other tanker"
  | "petrol/oil tanker"
  | "refrigerated"
  | "refuse"
  | "single decker"
  | "skeletal"
  | "skip loader"
  | "tipper"
  | "tractor";
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
export type RetarderBrake = "electric" | "exhaust" | "friction" | "hydraulic" | "other" | "none";
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

export interface TechRecordPUTPSVSkeleton {
  vin: string;
  partialVin?: string | null;
  systemNumber?: null | string;
  primaryVrm?: null | string;
  techRecord_vehicleType: "psv";
  techRecord_statusCode: StatusCode;
  techRecord_reasonForCreation: string;
  techRecord_createdAt?: null | string;
  techRecord_vehicleConfiguration?: VehicleConfiguration | null;
  techRecord_vehicleSize?: VehicleSize | null;
  techRecord_seatsLowerDeck?: number | null;
  techRecord_seatsUpperDeck?: number | null;
  techRecord_numberOfWheelsDriven?: number | null;
  techRecord_vehicleClass_code?: null | string;
  techRecord_vehicleClass_description: VehicleClassDescription;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_recordCompleteness?: null | string;
  techRecord_euVehicleCategory?: EUVehicleCategory | null;
  techRecord_regnDate?: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_noOfAxles?: number | null;
  techRecord_departmentalVehicleMarker?: boolean | null;
  techRecord_alterationMarker?: boolean | null;
  techRecord_approvalType?: ApprovalType | null;
  techRecord_approvalTypeNumber?: string | null;
  techRecord_ntaNumber?: string | null;
  techRecord_variantNumber?: string | null;
  techRecord_variantVersionNumber?: string | null;
  techRecord_bodyType_description: BodyTypeDescription;
  techRecord_bodyType_code?: null | string;
  techRecord_functionCode?: string | null;
  techRecord_conversionRefNo?: string | null;
  techRecord_grossGbWeight?: number | null;
  techRecord_grossDesignWeight?: number | null;
  techRecord_createdByName?: string | null;
  techRecord_createdById?: string | null;
  techRecord_lastUpdatedAt?: string | null;
  techRecord_lastUpdatedByName?: string | null;
  techRecord_lastUpdatedById?: string | null;
  techRecord_dda_certificateIssued?: boolean | null;
  techRecord_dda_wheelchairCapacity?: number | null;
  techRecord_dda_wheelchairFittings?: string | null;
  techRecord_dda_wheelchairLiftPresent?: boolean | null;
  techRecord_dda_wheelchairLiftInformation?: string | null;
  techRecord_dda_wheelchairRampPresent?: boolean | null;
  techRecord_dda_wheelchairRampInformation?: string | null;
  techRecord_dda_minEmergencyExits?: number | null;
  techRecord_dda_outswing?: string | null;
  techRecord_dda_ddaSchedules?: string | null;
  techRecord_dda_seatbeltsFitted?: number | null;
  techRecord_dda_ddaNotes?: string | null;
  techRecord_standingCapacity?: number | null;
  techRecord_speedLimiterMrk?: boolean | null;
  techRecord_tachoExemptMrk?: boolean | null;
  techRecord_euroStandard?: EuroStandard | null;
  techRecord_fuelPropulsionSystem?: FuelPropulsionSystem | null;
  techRecord_emissionsLimit?: null | number;
  techRecord_trainDesignWeight?: number | null;
  techRecord_numberOfSeatbelts?: string | null;
  techRecord_seatbeltInstallationApprovalDate?: string | null;
  techRecord_coifSerialNumber?: string | null;
  techRecord_coifCertifierName?: string | null;
  techRecord_coifDate?: string | null;
  techRecord_bodyMake: string | null;
  techRecord_bodyModel?: string | null;
  techRecord_chassisMake: string | null;
  techRecord_chassisModel: string | null;
  techRecord_modelLiteral?: string | null;
  techRecord_speedRestriction?: number | null;
  techRecord_grossKerbWeight?: number | null;
  techRecord_grossLadenWeight?: number | null;
  techRecord_unladenWeight?: number | null;
  techRecord_maxTrainGbWeight?: number | null;
  techRecord_dimensions_length?: number | null;
  techRecord_dimensions_width?: number | null;
  techRecord_dimensions_height?: number | null;
  techRecord_frontAxleToRearAxle?: number | null;
  techRecord_remarks?: string | null;
  techRecord_dispensations?: string | null;
  techRecord_axles?: null | PSVAxles[];
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_brakes_dtpNumber: string | null;
  techRecord_brakes_brakeCode?: string | null;
  techRecord_brakes_brakeCodeOriginal?: string | null;
  techRecord_brakes_dataTrBrakeOne?: string | null;
  techRecord_brakes_dataTrBrakeTwo?: string | null;
  techRecord_brakes_dataTrBrakeThree?: string | null;
  techRecord_brakes_retarderBrakeOne?: RetarderBrake | null;
  techRecord_brakes_retarderBrakeTwo?: RetarderBrake | null;
  techRecord_brakes_brakeForceWheelsNotLocked_parkingBrakeForceA?: number | null;
  techRecord_brakes_brakeForceWheelsNotLocked_secondaryBrakeForceA?: number | null;
  techRecord_brakes_brakeForceWheelsNotLocked_serviceBrakeForceA?: number | null;
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_parkingBrakeForceB?: number | null;
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_secondaryBrakeForceB?: number | null;
  techRecord_brakes_brakeForceWheelsUpToHalfLocked_serviceBrakeForceB?: number | null;
  techRecord_microfilm_microfilmDocumentType?: MicrofilmDocumentType | null;
  techRecord_microfilm_microfilmRollNumber?: string | null;
  techRecord_microfilm_microfilmSerialNumber?: string | null;
  techRecord_brakeCode?: string | null;
  createdTimestamp?: null | string;
  techRecord_applicationId?: string;
  secondaryVrms?: string[];
  techRecord_updateType?: null | string;
}
export interface PSVAxles {
  parkingBrakeMrk?: boolean | null;
  axleNumber?: number | null;
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
