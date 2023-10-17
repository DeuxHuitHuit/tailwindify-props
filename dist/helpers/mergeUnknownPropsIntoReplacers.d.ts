import { ExtractedTailwindifiedProps, Replacers } from 'types.js';
/**
 * Merges props into the global replacer dictionary.
 * @param {Record<string, string>} props
 * @returns undefined
 */
export declare const mergeUnknownPropsIntoReplacers: (replacers: Replacers, props: ExtractedTailwindifiedProps) => Replacers;
