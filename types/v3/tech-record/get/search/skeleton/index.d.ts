/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type StatusCode = "provisional" | "current" | "archived";
export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";

export interface TechRecordSearchSkeletonCarSchema {
  techRecord_manufactureYear: number | null;
  primaryVrm: string;
  vin: string;
  techRecord_statusCode: StatusCode;
  techRecord_vehicleType: VehicleType;
  createdTimestamp: string;
  systemNumber: string;
}
