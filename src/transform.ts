import { Transform } from './types.js';
import { DEFAULT_SCREEN } from './constants.js';
import { extractTailwindifiedProps } from './helpers/extractTailwindifiedProps.js';
import { mergeUnknownPropsIntoReplacers } from './helpers/mergeUnknownPropsIntoReplacers.js';
import { resolveTypesScriptAttributesValues } from './helpers/resolveTypesScriptAttributesValues.js';
import { resolveJavaScriptObjectAttributesValues } from './helpers/resolveJavaScriptObjectAttributesValues.js';
import { convertToTailwindClasses } from './helpers/convertToTailwindClasses.js';

const transform: Transform = (config) => {
	const configReplacers = config?.replacers || {};
	const defaultScreen = config?.defaultScreen || DEFAULT_SCREEN;
	return (content) => {
		// Extract prop names from tailwindify
		const props = extractTailwindifiedProps(content);
		// Merge with replacers
		const replacers = mergeUnknownPropsIntoReplacers(configReplacers, props);
		// Convert TypeScript declarations into attributes
		content = resolveTypesScriptAttributesValues(content);
		// Convert JavaScript object keys into attributes
		content = resolveJavaScriptObjectAttributesValues(content);
		// Pass all converters on the resulting string
		content = convertToTailwindClasses(content, replacers, defaultScreen);
		return content;
	};
};

/**
 * Replaces typescript variables and objects with a tailwind compatible syntax.
 */
export const ts = transform;

/**
 * Replaces javascript variables and objects with a tailwind compatible syntax.
 */
export const js = transform;

/**
 * Replaces svelte props with a tailwind compatible syntax.
 */
export const svelte: Transform = (config) => {
	const transform = ts(config);
	return (content) => {
		content = transform(content);
		// Restore Tailwind's own Svelte transform
		// github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
		content = content.replace(/(?:^|\s)class:/g, ' ');
		return content;
	};
};
