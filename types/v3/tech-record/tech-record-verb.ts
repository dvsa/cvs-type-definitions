import { TechRecordV3 } from '.';

export type TechRecordGET = TechRecordV3;
export type TechRecordPUT = TechRecordV3;

export type TechRecordType<V extends 'get' | 'put'> = V extends 'get'
    ? TechRecordGET
    : V extends 'put'
      ? TechRecordPUT
      : never;
