import { Screen } from '../types.js';
type Values = string;
type GetSingleValue = (value: string) => string;
/**
 * Parses a values string, passes the split parts one at a time to the getSingleValue callback
 * and returns the resulting className string.
 * @param values
 * @param getSingleValue
 * @param defaultScreen
 * @returns The generated classes from the values string.
 */
export declare const generateClassesFromValues: (values: Values, getSingleValue: GetSingleValue, defaultScreen: Screen) => string;
export {};
//# sourceMappingURL=generateClassesFromValues.d.ts.map