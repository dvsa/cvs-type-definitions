/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ActivitySchema {
  parentId?: string;
  id?: string;
  activityType: ActivityType;
  testStationName: string;
  testStationPNumber: string;
  testStationEmail: string;
  testStationType: TestStationTypes;
  testerName: string;
  testerStaffId: string;
  testerEmail?: string;
  startTime: string;
  endTime?: null | string;
  waitReason?: WaitReason[];
  notes?: string;
  activityDay?: string;
}

export enum ActivityType {
  VISIT = "visit",
  WAIT = "wait",
  UNACCOUNTABLE_TIME = "unaccountable time"
}
export enum TestStationTypes {
  ATF = "atf",
  GVTS = "gvts",
  HQ = "hq",
  POTF = "potf",
  VEF = "vef"
}
export enum WaitReason {
  WAITING_FOR_VEHICLE = "Waiting for vehicle",
  BREAK = "Break",
  ADMIN = "Admin",
  SITE_ISSUE = "Site issue",
  OTHER = "Other"
}
