import { Screen } from 'types';
type Values = string;
type GetSingleValue = (value: string) => string;
export declare const generateClassesFromValues: (values: Values, getSingleValue: GetSingleValue, defaultScreen: Screen) => string;
export {};
