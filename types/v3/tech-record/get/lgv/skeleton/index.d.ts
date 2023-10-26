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
