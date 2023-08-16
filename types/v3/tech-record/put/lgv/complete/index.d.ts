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
export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";
export type StatusCode = "provisional" | "current" | "archived";
export type VehicleSubclass = ("n" | "p" | "a" | "s" | "c" | "l" | "t" | "e" | "m" | "r" | "w")[];

export interface TechRecordCompleteLGVSchema {
  vin: string;
  primaryVrm?: string;
  trailerId?: string | null;
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  techRecord_euVehicleCategory?: EUVehicleCategory;
  techRecord_reasonForCreation?: string | null;
  techRecord_vehicleType: VehicleType;
  techRecord_statusCode?: StatusCode;
  techRecord_regnDate?: string | null;
  techRecord_manufactureYear?: string | null;
  techRecord_noOfAxles?: number | null;
  techRecord_notes?: string;
  techRecord_vehicleSubclass: VehicleSubclass;
  techRecord_hiddenInVta?: boolean;
  techRecord_updateType?: string;
  techRecord_createdAt?: string;
  techRecord_createdById?: string;
  techRecord_createdByName?: string;
  secondaryVrms?: string[];
}
