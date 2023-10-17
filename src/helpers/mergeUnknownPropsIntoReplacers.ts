import { ExtractedTailwindifiedProps, Replacers } from 'types.js';

/**
 * Merges props into the global replacer dictionary.
 * @param {Record<string, string>} props
 * @returns undefined
 */
export const mergeUnknownPropsIntoReplacers = (
	replacers: Replacers,
	props: ExtractedTailwindifiedProps
) => {
	if (!props) {
		return replacers;
	}
	const customReplacers: Replacers = {};
	Object.entries(props).forEach(([key, prefix]) => {
		if (!!customReplacers[key]) {
			return;
		}
		if (Array.isArray(prefix)) {
			customReplacers[key] = prefix.map((p) => `${p}-$value`).join(' ');
		} else {
			customReplacers[key] = `${prefix}-$value`;
		}
	});
	return { ...replacers, ...customReplacers };
};
