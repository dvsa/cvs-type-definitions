/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DimensionsSchema {
  length: number;
  width: number;
  /**
   * @minItems 1
   * @maxItems 1
   */
  axleSpacing: [
    {
      axles: string;
      value: number;
    }
  ];
}
