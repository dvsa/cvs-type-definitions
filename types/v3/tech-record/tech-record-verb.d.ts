import {
  TechRecordGETCar,
  TechRecordGETHGV,
  TechRecordGETLGV,
  TechRecordGETMotorcycle,
  TechRecordGETPSV,
  TechRecordGETTRL,
  TechRecordPUTCar,
  TechRecordPUTHGV,
  TechRecordPUTLGV,
  TechRecordPUTMotorcycle,
  TechRecordPUTPSV,
  TechRecordPUTTRL,
} from "./tech-record-verb-vehicle-type";

export type TechRecordType<V extends "get" | "put"> = V extends "get"
  ?
      | TechRecordGETCar
      | TechRecordGETLGV
      | TechRecordGETMotorcycle
      | TechRecordGETPSV
      | TechRecordGETHGV
      | TechRecordGETTRL
  : V extends "put"
  ?
      | TechRecordPUTCar
      | TechRecordPUTLGV
      | TechRecordPUTMotorcycle
      | TechRecordPUTPSV
      | TechRecordPUTHGV
      | TechRecordPUTTRL
  : never;
