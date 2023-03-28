"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelte = exports.convertToTailwindClasses = void 0;
const generateClassesFromValues_1 = require("./generateClassesFromValues");
const constants_1 = require("./constants");
const convertToTailwindClasses = (content, replacers, defaultScreen) => {
    return (Object.entries(replacers)
        // replace all instances of each reducers
        .reduce((content, [replacerKey, replacer]) => {
        const replacerRegExp = new RegExp(`(${replacerKey})(?::\\s[a-z0-9<>_|\\s.]+)?\\s?([:=])\\s?['"](?<values>[^\\s]*)['"]`, 'gi');
        return content.replace(replacerRegExp, (match, ...rest) => {
            const { values } = rest[rest.length - 1];
            if (!values) {
                return match;
            }
            return (0, generateClassesFromValues_1.generateClassesFromValues)(values, (value) => {
                if (typeof replacer === 'function') {
                    return replacer(value, replacerKey);
                }
                if (typeof replacer === 'string') {
                    return replacer
                        .replace(/\$prop/g, replacerKey)
                        .replace(/\$value/g, value);
                }
                return value;
            }, defaultScreen);
        });
    }, content));
};
exports.convertToTailwindClasses = convertToTailwindClasses;
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
const svelte = (config) => {
    const { replacers, defaultScreen } = config || {};
    return (content) => {
        const result = (0, exports.convertToTailwindClasses)(content, replacers || {}, defaultScreen || constants_1.DEFAULT_SCREEN)
            // Restore Tailwind's own Svelte transform
            // github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
            .replace(/(?:^|\s)class:/g, ' ');
        return result;
    };
};
exports.svelte = svelte;
