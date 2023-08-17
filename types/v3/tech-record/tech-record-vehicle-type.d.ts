import {
  TechRecordGETCarComplete,
  VehicleType,
} from "types/v3/tech-record/get/car/complete";
import { TechRecordGETCarSkeleton } from "types/v3/tech-record/get/car/skeleton";
import { TechRecordGETHGVComplete } from "types/v3/tech-record/get/hgv/complete";
import { TechRecordGETHGVSkeleton } from "types/v3/tech-record/get/hgv/skeleton";
import { TechRecordGETHGVTestable } from "types/v3/tech-record/get/hgv/testable";
import { TechRecordGETLGVComplete } from "types/v3/tech-record/get/lgv/complete";
import { TechRecordGETLGVSkeleton } from "types/v3/tech-record/get/lgv/skeleton";
import { TechRecordGETMotorcycleComplete } from "types/v3/tech-record/get/motorcycle/complete";
import { TechRecordGETMotorcycleSkeleton } from "types/v3/tech-record/get/motorcycle/skeleton";
import { TechRecordGETPSVComplete } from "types/v3/tech-record/get/psv/complete";
import { TechRecordGETPSVSkeleton } from "types/v3/tech-record/get/psv/skeleton";
import { TechRecordGETPSVTestable } from "types/v3/tech-record/get/psv/testable";
import { TechRecordGETTRLComplete } from "types/v3/tech-record/get/trl/complete";
import { TechRecordGETTRLSkeleton } from "types/v3/tech-record/get/trl/skeleton";
import { TechRecordGETTRLTestable } from "types/v3/tech-record/get/trl/testable";
import { TechRecordPUTCarComplete } from "types/v3/tech-record/put/car/complete";
import { TechRecordPUTCarSkeleton } from "types/v3/tech-record/put/car/skeleton";
import { TechRecordPUTHGVComplete } from "types/v3/tech-record/put/hgv/complete";
import { TechRecordPUTHGVSkeleton } from "types/v3/tech-record/put/hgv/skeleton";
import { TechRecordPUTHGVTestable } from "types/v3/tech-record/put/hgv/testable";
import { TechRecordPUTLGVComplete } from "types/v3/tech-record/put/lgv/complete";
import { TechRecordPUTLGVSkeleton } from "types/v3/tech-record/put/lgv/skeleton";
import { TechRecordPUTMotorcycleComplete } from "types/v3/tech-record/put/motorcycle/complete";
import { TechRecordPUTPSVComplete } from "types/v3/tech-record/put/psv/complete";
import { TechRecordPUTPSVSkeleton } from "types/v3/tech-record/put/psv/skeleton";
import { TechRecordPUTPSVTestable } from "types/v3/tech-record/put/psv/testable";
import { TechRecordPUTTRLComplete } from "types/v3/tech-record/put/trl/complete";
import { TechRecordPUTTRLSkeleton } from "types/v3/tech-record/put/trl/skeleton";
import { TechRecordPUTTRLTestable } from "types/v3/tech-record/put/trl/testable";

export type TechRecordCar =
  | TechRecordGETCarComplete
  | TechRecordGETCarSkeleton
  | TechRecordPUTCarComplete
  | TechRecordPUTCarSkeleton;
export type TechRecordLGV =
  | TechRecordGETLGVComplete
  | TechRecordGETLGVSkeleton
  | TechRecordPUTLGVComplete
  | TechRecordPUTLGVSkeleton;
export type TechRecordMotorcycle =
  | TechRecordGETMotorcycleComplete
  | TechRecordGETMotorcycleSkeleton
  | TechRecordPUTMotorcycleComplete
  | TechRecordPUTCarSkeleton;
export type TechRecordPSV =
  | TechRecordGETPSVComplete
  | TechRecordGETPSVSkeleton
  | TechRecordGETPSVTestable
  | TechRecordPUTPSVComplete
  | TechRecordPUTPSVSkeleton
  | TechRecordPUTPSVTestable;
export type TechRecordHGV =
  | TechRecordGETHGVComplete
  | TechRecordGETHGVSkeleton
  | TechRecordGETHGVTestable
  | TechRecordPUTHGVComplete
  | TechRecordPUTHGVSkeleton
  | TechRecordPUTHGVTestable;
export type TechRecordTRL =
  | TechRecordGETTRLComplete
  | TechRecordGETTRLSkeleton
  | TechRecordGETTRLTestable
  | TechRecordPUTTRLComplete
  | TechRecordPUTTRLSkeleton
  | TechRecordPUTTRLTestable;

export type TechRecordType<T extends VehicleType> = T extends "car"
  ? TechRecordCar
  : T extends "lgv"
  ? TechRecordLGV
  : T extends "motorcycle"
  ? TechRecordMotorcycle
  : T extends "psv"
  ? TechRecordPSV
  : T extends "hgv"
  ? TechRecordHGV
  : T extends "trl"
  ? TechRecordTRL
  : never;
