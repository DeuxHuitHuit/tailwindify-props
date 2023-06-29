"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTailwindifiedProps = void 0;
const TAILWINDIFY_CALL_REGEXP = () => /tailwindify\(\[?((?:['"`][A-z_-]+['"`],?\s?)+)\]?,\s?([A-z0-9\_]+)\)/g;
const arePrefixesEquals = (first, second) => {
    if (Array.isArray(first) && Array.isArray(second)) {
        return first.every((prefix, i) => prefix === second[i]);
    }
    return first === second;
};
const processPrefix = (prefix) => {
    const prefixArr = prefix.split(',').map((prefix) => prefix.replace(/['"`]/g, '').trim());
    if (prefixArr.length === 1) {
        return prefixArr[0];
    }
    return prefixArr;
};
/**
 * Looks for calls to tailwindify()/tailwindifyWithMin()/tailwindifyAspectRatio()
 * and extracts the prop and prefix name.
 * @param {string} content
 * @return Record<string, string>
 */
const extractTailwindifiedProps = (content) => {
    const matches = content.matchAll(TAILWINDIFY_CALL_REGEXP());
    const props = {};
    for (const match of matches) {
        const prop = match[2];
        const prefix = match[1];
        if (!prop) {
            continue;
        }
        const processedPrefix = processPrefix(prefix);
        if (props[prop] && !arePrefixesEquals(props[prop], processedPrefix)) {
            throw new Error(`Prop ${prop} used with 2 different prefixes: ${processedPrefix}, ${props[prop]}.`);
        }
        props[prop] = processedPrefix;
    }
    return props;
};
exports.extractTailwindifiedProps = extractTailwindifiedProps;