/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ActivitySchema {
  activityType: string;
  testStationName: string;
  testStationPNumber: string;
  testStationEmail: string;
  testStationType: string;
  testerName: string;
  testerStaffId: string;
  testerEmail?: string;
  startTime: string;
  endTime?: string;
  parentId?: string;
  waitReason?: string[];
  notes?: string;
  id?: string;
}