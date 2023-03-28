import { generateClassesFromValues } from './utils/generateClassesFromValues';
import { camelToKebabCase } from './utils/camelToSnakeCase';
import { BASE_REPLACER, DEFAULT_SCREEN, KEY_VALUES_REGEXP, PROP_REGEXP } from './constants';
/**
 * Transform typescript variables declaration to attribute syntax, so that
 * `const padding: PxUnit = '12|24';` becomes `padding="12|24";`
 */
export const resolvePropValues = (content) => {
    return content.replace(PROP_REGEXP, (...args) => {
        const groups = args[args.length - 1];
        return `${groups.prop}="${groups.value}"`;
    });
};
export const convertToTailwindClasses = (content, replacers, defaultScreen) => {
    return content.replace(KEY_VALUES_REGEXP, (match, ...rest) => {
        const { key, values } = rest[rest.length - 1];
        if (!values) {
            return match;
        }
        const replacer = replacers[key];
        return generateClassesFromValues(values, (value) => {
            if (typeof replacer === 'undefined') {
                const kebabCaseKey = camelToKebabCase(key);
                return BASE_REPLACER.replace(/\$prop/g, kebabCaseKey).replace(/\$value/g, value);
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
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
export const svelte = (config) => {
    const { replacers, defaultScreen } = config || {};
    return (content) => {
        // Convert prop declarations into attributes
        content = resolvePropValues(content);
        // Pass all converters on the resulting string
        content = convertToTailwindClasses(content, replacers || {}, defaultScreen || DEFAULT_SCREEN);
        // Restore Tailwind's own Svelte transform
        // github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
        content = content.replace(/(?:^|\s)class:/g, ' ');
        return content;
    };
};
