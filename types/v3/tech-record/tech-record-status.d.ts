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
import { TechRecordPUTMotorcycleSkeleton } from "./put/motorcycle/skeleton";
import { TechRecordPUTPSVComplete } from "./put/psv/complete";
import { TechRecordPUTPSVSkeleton } from "./put/psv/skeleton";
import { TechRecordPUTPSVTestable } from "./put/psv/testable";
import { TechRecordPUTTRLComplete } from "./put/trl/complete";
import { TechRecordPUTTRLSkeleton } from "./put/trl/skeleton";
import { TechRecordPUTTRLTestable } from "./put/trl/testable";

export type TechRecordSkeleton =
  | TechRecordPUTCarSkeleton
  | TechRecordGETCarSkeleton
  | TechRecordPUTLGVSkeleton
  | TechRecordGETLGVSkeleton
  | TechRecordPUTMotorcycleSkeleton
  | TechRecordGETMotorcycleSkeleton
  | TechRecordPUTHGVSkeleton
  | TechRecordGETHGVSkeleton
  | TechRecordPUTPSVSkeleton
  | TechRecordGETPSVSkeleton
  | TechRecordPUTTRLSkeleton
  | TechRecordGETTRLSkeleton;

export type TechRecordComplete =
  | TechRecordPUTCarComplete
  | TechRecordGETCarComplete
  | TechRecordPUTLGVComplete
  | TechRecordGETLGVComplete
  | TechRecordPUTMotorcycleComplete
  | TechRecordGETMotorcycleComplete
  | TechRecordPUTHGVComplete
  | TechRecordGETHGVComplete
  | TechRecordPUTPSVComplete
  | TechRecordGETPSVComplete
  | TechRecordPUTTRLComplete
  | TechRecordGETTRLComplete;

export type TechRecordTestable =
  | TechRecordPUTHGVTestable
  | TechRecordGETHGVTestable
  | TechRecordPUTPSVTestable
  | TechRecordGETPSVTestable
  | TechRecordPUTTRLTestable
  | TechRecordGETTRLTestable;

export type TechRecordType<T extends "skeleton" | "complete" | "testable"> =
  T extends "skeleton"
    ? TechRecordSkeleton
    : T extends "complete"
    ? TechRecordComplete
    : T extends "testable"
    ? TechRecordTestable
    : never;
