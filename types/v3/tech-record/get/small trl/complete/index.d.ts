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
export type VehicleSubclass = ("n" | "p" | "a" | "s" | "c" | "l" | "t" | "e" | "m" | "r" | "w")[];

export interface TechRecordGETSmallTRLComplete {
  techRecord_applicantDetails_address1?: string | null;
  techRecord_applicantDetails_address2?: string | null;
  techRecord_applicantDetails_address3?: string | null;
  techRecord_applicantDetails_emailAddress?: string | null;
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_postCode?: string | null;
  techRecord_applicantDetails_postTown?: string | null;
  techRecord_applicantDetails_telephoneNumber?: string | null;
  techRecord_createdAt: string;
  techRecord_createdById: string;
  techRecord_createdByName: string;
  techRecord_euVehicleCategory: "o1" | "o2";
  techRecord_lastUpdatedAt?: string | null;
  techRecord_lastUpdatedById?: string | null;
  techRecord_lastUpdatedByName?: string | null;
  techRecord_manufactureYear?: number | null;
  techRecord_noOfAxles: number;
  techRecord_notes?: string | null;
  techRecord_reasonForCreation: string;
  techRecord_statusCode: StatusCode;
  techRecord_vehicleClass_code: string;
  techRecord_vehicleClass_description: VehicleClassDescription;
  techRecord_vehicleConfiguration: VehicleConfiguration;
  techRecord_vehicleSubclass?: VehicleSubclass;
  techRecord_vehicleType: "trl";
  vin: string;
  trailerId?: string;
  systemNumber: string;
  createdTimestamp: string;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_recordCompleteness?: "complete";
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
