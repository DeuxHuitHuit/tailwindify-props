import { ExtractedTailwindifiedProps } from '../types';
/**
 * Looks for calls to tailwindify()/tailwindifyWithMin()/tailwindifyAspectRatio()
 * and extracts the prop and prefix name.
 * @param {string} content
 * @return Record<string, string>
 */
export declare const extractTailwindifiedProps: (content: string) => ExtractedTailwindifiedProps;
