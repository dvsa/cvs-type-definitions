/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface TankDetailsSchema {
  tankManufacturer?: string;
  tc2Details?: TC2DetailsSchema;
  tc3Details?: TC3DetailsSchema[];
  yearOfManufacture?: string;
  tankCode?: string;
  specialProvisions?: string;
  tankManufacturerSerialNo?: string;
  tankTypeAppNo?: string;
}
export interface TC2DetailsSchema {
  tc2Type?: string;
  tc2IntermediateApprovalNo?: string;
  tc2IntermediateExpiryDate?: string;
}
export interface TC3DetailsSchema {
  tc3Type?: string;
  tc3IntermediateApprovalNo?: string;
  tc3IntermediateExpiryDate?: string;
}
