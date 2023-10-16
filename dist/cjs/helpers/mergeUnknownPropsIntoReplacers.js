"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUnknownPropsIntoReplacers = void 0;
/**
 * Merges props into the global replacer dictionary.
 * @param {Record<string, string>} props
 * @returns undefined
 */
const mergeUnknownPropsIntoReplacers = (replacers, props) => {
    if (!props) {
        return replacers;
    }
    const customReplacers = {};
    Object.entries(props).forEach(([key, prefix]) => {
        if (!!customReplacers[key]) {
            return;
        }
        if (Array.isArray(prefix)) {
            customReplacers[key] = prefix.map((p) => `${p}-$value`).join(' ');
        }
        else {
            customReplacers[key] = `${prefix}-$value`;
        }
    });
    return Object.assign(Object.assign({}, replacers), customReplacers);
};
exports.mergeUnknownPropsIntoReplacers = mergeUnknownPropsIntoReplacers;
