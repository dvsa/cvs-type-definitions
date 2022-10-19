/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DefectDetailsSchema {
  imNumber: number;
  imDescription: string;
  additionalInformation: {
    location: DefectLocationSchema;
    notes: string;
  };
  itemNumber: number;
  itemDescription: string;
  deficiencyRef: string;
  deficiencyId: string | null;
  deficiencySubId: string | null;
  deficiencyCategory: string;
  deficiencyText: string | null;
  stdForProhibition: boolean | null;
  prs: boolean | null;
  prohibitionIssued: boolean | null;
  metadata: {
    category: {
      additionalInfo?: {
        location: DefectLocationMetadataSchema;
        notes: boolean;
      };
    };
  };
}
export interface DefectLocationSchema {
  vertical?: string | null;
  horizontal?: string | null;
  lateral?: string | null;
  longitudinal?: string | null;
  rowNumber?: number | null;
  seatNumber?: number | null;
  axleNumber?: number | null;
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