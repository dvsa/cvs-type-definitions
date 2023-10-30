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

export interface TechRecordGETMotorcycleComplete {
  secondaryVrms?: string[];
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  createdTimestamp: string;
  partialVin: string;
  primaryVrm: string;
  systemNumber: string;
  techRecord_createdAt: null | string;
  techRecord_createdById: null | string;
  techRecord_createdByName: null | string;
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
  techRecord_vehicleClass_description: VehicleClassDescription;
  techRecord_vehicleClass_code: string;
  techRecord_vehicleConfiguration: VehicleConfiguration;
  techRecord_vehicleType: "motorcycle";
  vin: string;
  techRecord_numberOfWheelsDriven: number;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_updateType?: null | string;
}

export enum VehicleClassDescription {
  MotorbikesOver200ccOrWithASidecar = "motorbikes over 200cc or with a sidecar",
  NotApplicable = "not applicable",
  SmallPsvIeLessThanOrEqualTo22Seats = "small psv (ie: less than or equal to 22 seats)",
  MotorbikesUpTo200cc = "motorbikes up to 200cc",
  Trailer = "trailer",
  LargePsvIeGreaterThan23Seats = "large psv(ie: greater than 23 seats)",
  _3Wheelers = "3 wheelers",
  HeavyGoodsVehicle = "heavy goods vehicle",
  MOTClass4 = "MOT class 4",
  MOTClass7 = "MOT class 7",
  MOTClass5 = "MOT class 5"
}
