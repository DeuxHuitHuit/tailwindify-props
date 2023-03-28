import { Screen } from './types';
import { DEFAULT_SCREEN } from './constants';
import { generateClassesFromValues } from './generateClassesFromValues';

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
