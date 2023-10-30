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

export interface TechRecordPUTMotorcycleComplete {
  secondaryVrms?: null | string[];
  techRecord_applicantDetails_name?: string | null;
  techRecord_applicantDetails_address1?: null | string;
  techRecord_applicantDetails_address2?: null | string;
  techRecord_applicantDetails_postTown?: null | string;
  techRecord_applicantDetails_address3?: null | string;
  techRecord_applicantDetails_postCode?: null | string;
  techRecord_applicantDetails_telephoneNumber?: null | string;
  techRecord_applicantDetails_emailAddress?: null | string;
  partialVin?: null | string;
  primaryVrm?: null | string;
  systemNumber?: null | string;
  techRecord_euVehicleCategory?: null | EUVehicleCategory;
  techRecord_manufactureYear?: number | null;
  techRecord_recordCompleteness?: null | string;
  techRecord_noOfAxles?: null | number;
  techRecord_notes?: null | string;
  techRecord_reasonForCreation: string;
  techRecord_regnDate?: string | null;
  techRecord_statusCode: StatusCode;
  techRecord_vehicleClass_description: VehicleClassDescription;
  techRecord_vehicleConfiguration: VehicleConfiguration;
  techRecord_vehicleType: "motorcycle";
  vin: string;
  techRecord_numberOfWheelsDriven: number;
  techRecord_hiddenInVta?: null | boolean;
  techRecord_updateType?: null | string;
}

export enum EUVehicleCategory {
  M1 = "m1",
  M2 = "m2",
  M3 = "m3",
  N1 = "n1",
  N2 = "n2",
  N3 = "n3",
  O1 = "o1",
  O2 = "o2",
  O3 = "o3",
  O4 = "o4",
  L1E_A = "l1e-a",
  l1E = "l1e",
  L2e = "l2e",
  L3E = "l3e",
  L4E = "l4e",
  L5E = "l5e",
  L6E = "l6e",
  L7E = "l7e"
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
