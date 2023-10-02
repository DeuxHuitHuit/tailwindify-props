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
        return;
    }
    Object.entries(props).forEach(([key, prefix]) => {
        if (!!replacers[key]) {
            return;
        }
        if (Array.isArray(prefix)) {
            replacers[key] = prefix.map((p) => `${p}-$value`).join(' ');
        }
        else {
            replacers[key] = `${prefix}-$value`;
        }
    });
};
exports.mergeUnknownPropsIntoReplacers = mergeUnknownPropsIntoReplacers;
