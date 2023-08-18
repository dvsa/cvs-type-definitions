import { TechRecordGETCarComplete } from "./get/car/complete";
import { TechRecordGETCarSkeleton } from "./get/car/skeleton";
import { TechRecordGETHGVComplete } from "./get/hgv/complete";
import { TechRecordGETHGVSkeleton } from "./get/hgv/skeleton";
import { TechRecordGETHGVTestable } from "./get/hgv/testable";
import { TechRecordGETLGVComplete, VehicleType } from "./get/lgv/complete";
import { TechRecordGETLGVSkeleton } from "./get/lgv/skeleton";
import { TechRecordGETMotorcycleComplete } from "./get/motorcycle/complete";
import { TechRecordGETMotorcycleSkeleton } from "./get/motorcycle/skeleton";
import { TechRecordGETPSVComplete } from "./get/psv/complete";
import { TechRecordGETPSVSkeleton } from "./get/psv/skeleton";
import { TechRecordGETPSVTestable } from "./get/psv/testable";
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
