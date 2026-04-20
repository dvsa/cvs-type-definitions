import { TechRecordV3 } from '.';
import { statusCodeEnum, type StatusCode } from '../../enums';

export { statusCodeEnum, StatusCode };

export type TechRecordSkeleton = TechRecordV3;
export type TechRecordComplete = TechRecordV3;
export type TechRecordTestable = TechRecordV3;

export type TechRecordType<T extends 'skeleton' | 'complete' | 'testable'> =
    T extends 'skeleton'
        ? TechRecordSkeleton
        : T extends 'complete'
          ? TechRecordComplete
          : T extends 'testable'
            ? TechRecordTestable
            : never;
