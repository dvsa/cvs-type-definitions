/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type VehicleType = "psv" | "trl" | "hgv" | "car" | "lgv" | "motorcycle";
export type StatusCode = "provisional" | "current" | "archived";
export type VehicleSubclass = ("n" | "p" | "a" | "s" | "c" | "l" | "t" | "e" | "m" | "r" | "w")[];

export interface TechRecordPUTCarComplete {
  vin: string;
  primaryVrm?: string;
  trailerId?: string | null;
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
