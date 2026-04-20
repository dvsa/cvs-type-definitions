import { TechRecordV3 } from '.';
import { type VehicleType } from '../../enums';

export type TechRecordGETCar = TechRecordV3;
export type TechRecordPUTCar = TechRecordV3;
export type TechRecordGETLGV = TechRecordV3;
export type TechRecordPUTLGV = TechRecordV3;
export type TechRecordGETMotorcycle = TechRecordV3;
export type TechRecordPUTMotorcycle = TechRecordV3;
export type TechRecordGETPSV = TechRecordV3;
export type TechRecordPUTPSV = TechRecordV3;
export type TechRecordGETHGV = TechRecordV3;
export type TechRecordPUTHGV = TechRecordV3;
export type TechRecordGETTRL = TechRecordV3;
export type TechRecordPUTTRL = TechRecordV3;

export type TechRecordType<
    T extends VehicleType,
    V extends 'get' | 'put',
> = T extends 'car'
    ? V extends 'get'
        ? TechRecordGETCar
        : TechRecordPUTCar
    : T extends 'lgv'
      ? V extends 'get'
          ? TechRecordGETLGV
          : TechRecordPUTLGV
      : T extends 'motorcycle'
        ? V extends 'get'
            ? TechRecordGETMotorcycle
            : TechRecordPUTMotorcycle
        : T extends 'psv'
          ? V extends 'get'
              ? TechRecordGETPSV
              : TechRecordPUTPSV
          : T extends 'hgv'
            ? V extends 'get'
                ? TechRecordGETHGV
                : TechRecordPUTHGV
            : T extends 'trl'
              ? V extends 'get'
                  ? TechRecordGETTRL
                  : TechRecordPUTTRL
              : never;
