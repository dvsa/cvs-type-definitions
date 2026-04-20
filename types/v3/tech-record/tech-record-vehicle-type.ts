import { TechRecordV3 } from '.';
import { vehicleTypeEnum, type VehicleType } from '../../enums';

export { vehicleTypeEnum, VehicleType };

export type TechRecordCar = TechRecordV3;
export type TechRecordLGV = TechRecordV3;
export type TechRecordMotorcycle = TechRecordV3;
export type TechRecordPSV = TechRecordV3;
export type TechRecordHGV = TechRecordV3;
export type TechRecordTRL = TechRecordV3;

export type TechRecordType<T extends VehicleType> = T extends 'car'
    ? TechRecordCar
    : T extends 'lgv'
      ? TechRecordLGV
      : T extends 'motorcycle'
        ? TechRecordMotorcycle
        : T extends 'psv'
          ? TechRecordPSV
          : T extends 'hgv'
            ? TechRecordHGV
            : T extends 'trl'
              ? TechRecordTRL
              : never;
