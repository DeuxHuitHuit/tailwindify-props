import { Transform } from './types';
import { DEFAULT_SCREEN } from './constants';
import { extractTailwindifiedProps } from './helpers/extractTailwindifiedProps';
import { mergeUnknownPropsIntoReplacers } from './helpers/mergeUnknownPropsIntoReplacers';
import { resolveTypesScriptAttributesValues } from './helpers/resolveTypesScriptAttributesValues';
import { resolveJavaScriptObjectAttributesValues } from './helpers/resolveJavaScriptObjectAttributesValues';
import { convertToTailwindClasses } from './helpers/convertToTailwindClasses';

/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
export const svelte: Transform = (config) => {
	const replacers = config?.replacers || {};
	const defaultScreen = config?.defaultScreen || DEFAULT_SCREEN;
	return (content) => {
		// Extract prop names from tailwindify
		const props = extractTailwindifiedProps(content);
		// Merge with replacers
		mergeUnknownPropsIntoReplacers(replacers, props);
		// Convert TypeScript declarations into attributes
		content = resolveTypesScriptAttributesValues(content);
		// Convert JavaScript object keys into attributes
		content = resolveJavaScriptObjectAttributesValues(content);
		// Pass all converters on the resulting string
		content = convertToTailwindClasses(content, replacers, defaultScreen);
		// Restore Tailwind's own Svelte transform
		// github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
		content = content.replace(/(?:^|\s)class:/g, ' ');
		return content;
	};
};
