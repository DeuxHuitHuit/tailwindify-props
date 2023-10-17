import { Screen, Replacers } from '../types.js';
/**
 *
 * Convert responsive attributes to Tailwind classes, so that:
 * - attribute="mobile|desktop" becomes attribute-mobile <default-screen>:attribute-desktop
 * - attribute="mobile|md:desktop" attribute-mobile md:attribute-desktop
 * - attribute="mobile|md:desktop|hd:wide" attribute-mobile md:attribute-desktop hd:attribute-wide
 * @param content
 * @param replacers
 * @param defaultScreen
 * @returns
 */
export declare const convertToTailwindClasses: (content: string, replacers: Replacers, defaultScreen: Screen) => string;
//# sourceMappingURL=convertToTailwindClasses.d.ts.map