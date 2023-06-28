import { Transform } from './types';
import { DEFAULT_SCREEN } from './constants';
import { resolveTypesScriptAttributesValues } from './helpers/resolveTypesScriptAttributesValues';
import { resolveJavaScriptObjectAttributesValues } from './helpers/resolveJavaScriptObjectAttributesValues';
import { duplicateResponsiveAttributes } from 'helpers/duplicateResponsiveAttributes';
import { convertToTailwindClasses } from 'helpers/convertToTailwindClasses';

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
		// Convert properties with responsive values into duplicates
		content = duplicateResponsiveAttributes(content);
		// Pass all converters on the resulting string
		const result = convertToTailwindClasses(
			content,
			replacers || {},
			defaultScreen || DEFAULT_SCREEN
		)
			// Restore Tailwind's own Svelte transform
			// github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
			.replace(/(?:^|\s)class:/g, ' ');
		return result;
	};
};
