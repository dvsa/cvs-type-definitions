/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";

export interface TechRecordSkeletonCarSchema {
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  createdTimestamp: string;
  partialVin?: string;
  primaryVrm?: string;
  systemNumber: string;
  techRecord_createdAt?: string;
  techRecord_createdById?: string;
  techRecord_createdByName?: string;
  techRecord_euVehicleCategory?: EUVehicleCategory;
  techRecord_lastUpdatedAt?: string | null;
  techRecord_lastUpdatedById?: string | null;
  techRecord_lastUpdatedByName?: string | null;
  techRecord_manufactureYear?: string | null;
  techRecord_recordCompleteness?: string;
  techRecord_noOfAxles?: number;
  techRecord_notes?: string;
  techRecord_reasonForCreation?: string;
  techRecord_regnDate?: string | null;
  techRecord_statusCode?: StatusCode;
  techRecord_vehicleConfiguration?: VehicleConfiguration;
  techRecord_vehicleType?: VehicleType;
  vin: string;
  techRecord_hiddenInVta?: boolean;
  techRecord_updateType?: string;
}
