import { Screen, Replacers, Transform } from './types';
export declare const convertToTailwindClasses: (content: string, replacers: Replacers, defaultScreen: Screen) => string;
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
export declare const svelte: Transform;
