import { Screen, Replacers, Transform } from './types';
/**
 * Transform typescript variables declaration to attribute syntax, so that
 * `const padding: PxUnit = '12|24';` becomes `padding="12|24";`
 */
export declare const resolvePropValues: (content: string) => string;
export declare const convertToTailwindClasses: (content: string, replacers: Replacers, defaultScreen: Screen) => string;
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
export declare const svelte: Transform;
