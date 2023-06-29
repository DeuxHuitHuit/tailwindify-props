import { Transform } from './types';
import { DEFAULT_SCREEN } from './constants';
import { resolveTypesScriptAttributesValues } from './helpers/resolveTypesScriptAttributesValues';
import { resolveJavaScriptObjectAttributesValues } from './helpers/resolveJavaScriptObjectAttributesValues';
import { convertToTailwindClasses } from './helpers/convertToTailwindClasses';

/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
export const svelte: Transform = (config) => {
	const { replacers, defaultScreen } = config || {};
	return (content) => {
		// Convert TypeScript declarations into attributes
		content = resolveTypesScriptAttributesValues(content);
		// Convert JavaScript object keys into attributes
		content = resolveJavaScriptObjectAttributesValues(content);
		// Pass all converters on the resulting string
		content = convertToTailwindClasses(
			content,
			replacers || {},
			defaultScreen || DEFAULT_SCREEN
		);
		// Restore Tailwind's own Svelte transform
		// github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
		content = content.replace(/(?:^|\s)class:/g, ' ');
		return content;
	};
};
