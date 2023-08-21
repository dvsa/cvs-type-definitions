import { TechRecordGETCarComplete } from "./get/car/complete";
import { TechRecordGETCarSkeleton } from "./get/car/skeleton";
import { TechRecordGETHGVComplete } from "./get/hgv/complete";
import { TechRecordGETHGVSkeleton } from "./get/hgv/skeleton";
import { TechRecordGETHGVTestable } from "./get/hgv/testable";
import { TechRecordGETLGVComplete } from "./get/lgv/complete";
import { TechRecordGETLGVSkeleton } from "./get/lgv/skeleton";
import { TechRecordGETMotorcycleComplete } from "./get/motorcycle/complete";
import { TechRecordGETMotorcycleSkeleton } from "./get/motorcycle/skeleton";
import { TechRecordGETPSVComplete } from "./get/psv/complete";
import { TechRecordGETPSVSkeleton } from "./get/psv/skeleton";
import { TechRecordGETPSVTestable } from "./get/psv/testable";
import { VehicleType } from "./get/search";
import { TechRecordGETTRLComplete } from "./get/trl/complete";
import { TechRecordGETTRLSkeleton } from "./get/trl/skeleton";
import { TechRecordGETTRLTestable } from "./get/trl/testable";
import { TechRecordPUTCarComplete } from "./put/car/complete";
import { TechRecordPUTCarSkeleton } from "./put/car/skeleton";
import { TechRecordPUTHGVComplete } from "./put/hgv/complete";
import { TechRecordPUTHGVSkeleton } from "./put/hgv/skeleton";
import { TechRecordPUTHGVTestable } from "./put/hgv/testable";
import { TechRecordPUTLGVComplete } from "./put/lgv/complete";
import { TechRecordPUTLGVSkeleton } from "./put/lgv/skeleton";
import { TechRecordPUTMotorcycleComplete } from "./put/motorcycle/complete";
import { TechRecordPUTPSVComplete } from "./put/psv/complete";
import { TechRecordPUTPSVSkeleton } from "./put/psv/skeleton";
import { TechRecordPUTPSVTestable } from "./put/psv/testable";
import { TechRecordPUTTRLComplete } from "./put/trl/complete";
import { TechRecordPUTTRLSkeleton } from "./put/trl/skeleton";
import { TechRecordPUTTRLTestable } from "./put/trl/testable";

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
