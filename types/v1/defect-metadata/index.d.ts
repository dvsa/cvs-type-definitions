/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DefectMetadataSchema {
  category: {
    additionalInfo?: DefectAdditionalDetailsMetadataSchema;
  };
}
export interface DefectAdditionalDetailsMetadataSchema {
  location: DefectLocationMetadataSchema;
  notes: boolean;
}
export interface DefectLocationMetadataSchema {
  vertical?: string[] | null;
  horizontal?: string[] | null;
  lateral?: string[] | null;
  longitudinal?: string[] | null;
  rowNumber?: number[] | null;
  seatNumber?: number[] | null;
  axleNumber?: number[] | null;
}
