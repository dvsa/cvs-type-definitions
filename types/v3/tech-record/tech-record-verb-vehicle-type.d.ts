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

export type TechRecordGETCar =
  | TechRecordGETCarComplete
  | TechRecordGETCarSkeleton;

export type TechRecordPUTCar =
  | TechRecordPUTCarComplete
  | TechRecordPUTCarSkeleton;

export type TechRecordGETLGV =
  | TechRecordGETLGVComplete
  | TechRecordGETLGVSkeleton;

export type TechRecordPUTLGV =
  | TechRecordPUTLGVComplete
  | TechRecordPUTLGVSkeleton;

export type TechRecordGETMotorcycle =
  | TechRecordGETMotorcycleComplete
  | TechRecordGETMotorcycleSkeleton;

export type TechRecordPUTMotorcycle =
  | TechRecordPUTMotorcycleComplete
  | TechRecordPUTCarSkeleton;

export type TechRecordGETPSV =
  | TechRecordGETPSVComplete
  | TechRecordGETPSVSkeleton
  | TechRecordGETPSVTestable;

export type TechRecordPUTPSV =
  | TechRecordPUTPSVComplete
  | TechRecordPUTPSVSkeleton
  | TechRecordPUTPSVTestable;

export type TechRecordGETHGV =
  | TechRecordGETHGVComplete
  | TechRecordGETHGVSkeleton
  | TechRecordGETHGVTestable;

export type TechRecordPUTHGV =
  | TechRecordPUTHGVComplete
  | TechRecordPUTHGVSkeleton
  | TechRecordPUTHGVTestable;

export type TechRecordGETTRL =
  | TechRecordGETTRLComplete
  | TechRecordGETTRLSkeleton
  | TechRecordGETTRLTestable;

export type TechRecordPUTTRL =
  | TechRecordPUTTRLComplete
  | TechRecordPUTTRLSkeleton
  | TechRecordPUTTRLTestable;

export type TechRecordType<
  T extends VehicleType,
  V extends "get" | "put"
> = T extends "car"
  ? V extends "get"
    ? TechRecordGETCar
    : TechRecordPUTCar
  : T extends "lgv"
  ? V extends "get"
    ? TechRecordGETLGV
    : TechRecordPUTLGV
  : T extends "motorcycle"
  ? V extends "get"
    ? TechRecordGETMotorcycle
    : TechRecordPUTMotorcycle
  : T extends "psv"
  ? V extends "get"
    ? TechRecordGETPSV
    : TechRecordPUTPSV
  : T extends "hgv"
  ? V extends "get"
    ? TechRecordGETHGV
    : TechRecordPUTHGV
  : T extends "trl"
  ? V extends "get"
    ? TechRecordGETTRL
    : TechRecordPUTTRL
  : never;
