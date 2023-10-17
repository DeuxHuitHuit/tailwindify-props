import { Screen } from './types.js';
import { DEFAULT_SCREEN } from './constants.js';
import { generateClassesFromValues } from './helpers/generateClassesFromValues.js';

export const tailwindify = (
	classPrefix: string | string[],
	values: string,
	defaultScreen: Screen = DEFAULT_SCREEN
) => {
	return generateClassesFromValues(
		values,
		(value) => {
			return Array.isArray(classPrefix)
				? classPrefix
						.map((prefix) => {
							return `${prefix}-${value}`;
						})
						.join(' ')
				: `${classPrefix}-${value}`;
		},
		defaultScreen
	);
};
