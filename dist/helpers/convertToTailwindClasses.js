import { BASE_REPLACER } from '../constants.js';
import { generateClassesFromValues } from './generateClassesFromValues.js';
const RESP_ATTR_REGEXP = /(?<attribute>[a-zA-Z0-9]+)="(?<values>[^"]+)"/g;
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
export const convertToTailwindClasses = (content, replacers, defaultScreen) => {
    return content.replace(RESP_ATTR_REGEXP, (match, ...rest) => {
        const { values, attribute } = rest[rest.length - 1];
        if (!values) {
            return match;
        }
        const replacer = replacers[attribute] || BASE_REPLACER;
        return generateClassesFromValues(values, (value) => {
            if (typeof replacer === 'function') {
                return replacer(value, attribute);
            }
            if (typeof replacer === 'string') {
                return replacer.replace(/\$prop/g, attribute).replace(/\$value/g, value);
            }
            return value;
        }, defaultScreen);
    });
};
//# sourceMappingURL=convertToTailwindClasses.js.map