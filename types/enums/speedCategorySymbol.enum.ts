import { z } from 'zod';

export const speedCategorySymbolEnum = z.enum(['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b', 'c', 'd', 'e', 'f', 'g', 'j', 'k', 'l', 'm', 'n', 'p', 'q',]);
export type SpeedCategorySymbol = z.infer<typeof speedCategorySymbolEnum>;
