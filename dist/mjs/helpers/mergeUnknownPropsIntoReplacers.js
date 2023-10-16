/**
 * Merges props into the global replacer dictionary.
 * @param {Record<string, string>} props
 * @returns undefined
 */
export const mergeUnknownPropsIntoReplacers = (replacers, props) => {
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
    return { ...replacers, ...customReplacers };
};
