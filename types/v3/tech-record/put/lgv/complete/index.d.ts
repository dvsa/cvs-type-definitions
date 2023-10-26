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

export interface TechRecordPUTLGVComplete {
  vin: string;
  primaryVrm?: string;
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_euVehicleCategory?: EUVehicleCategory | null;
  techRecord_reasonForCreation: string;
  techRecord_vehicleType: "lgv";
  techRecord_statusCode: StatusCode;
  techRecord_regnDate?: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_noOfAxles: number;
  techRecord_notes?: string;
  techRecord_vehicleSubclass: VehicleSubclass;
  techRecord_hiddenInVta?: boolean;
  techRecord_updateType?: string;
  secondaryVrms?: string[];
  techRecord_vehicleConfiguration: VehicleConfiguration;
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
