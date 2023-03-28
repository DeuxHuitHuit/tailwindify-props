"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelte = exports.convertToTailwindClasses = exports.resolvePropValues = void 0;
const generateClassesFromValues_1 = require("./generateClassesFromValues");
const constants_1 = require("./constants");
const camelToSnakeCase_1 = require("./camelToSnakeCase");
/**
 * Transform typescript variables declaration to attribute syntax, so that
 * `const padding: PxUnit = '12|24';` becomes `padding="12|24";`
 */
const resolvePropValues = (content) => {
    return content.replace(constants_1.PROP_REGEXP, (...args) => {
        const groups = args[args.length - 1];
        return `${groups.prop}="${groups.value}"`;
    });
};
exports.resolvePropValues = resolvePropValues;
const convertToTailwindClasses = (content, replacers, defaultScreen) => {
    return content.replace(constants_1.KEY_VALUES_REGEXP, (match, ...rest) => {
        const { key, values } = rest[rest.length - 1];
        if (!values) {
            return match;
        }
        const replacer = replacers[key];
        return (0, generateClassesFromValues_1.generateClassesFromValues)(values, (value) => {
            if (typeof replacer === 'undefined') {
                const kebabCaseKey = (0, camelToSnakeCase_1.camelToKebabCase)(key);
                return constants_1.BASE_REPLACER.replace(/\$prop/g, kebabCaseKey).replace(/\$value/g, value);
            }
            if (typeof replacer === 'function') {
                return replacer(value, key);
            }
            if (typeof replacer === 'string') {
                return replacer.replace(/\$prop/g, key).replace(/\$value/g, value);
            }
            return value;
        }, defaultScreen);
    });
};
exports.convertToTailwindClasses = convertToTailwindClasses;
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
const svelte = (config) => {
    const { replacers, defaultScreen } = config || {};
    return (content) => {
        // Convert prop declarations into attributes
        content = (0, exports.resolvePropValues)(content);
        // Pass all converters on the resulting string
        content = (0, exports.convertToTailwindClasses)(content, replacers || {}, defaultScreen || constants_1.DEFAULT_SCREEN);
        // Restore Tailwind's own Svelte transform
        // github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
        content = content.replace(/(?:^|\s)class:/g, ' ');
        return content;
    };
};
exports.svelte = svelte;
