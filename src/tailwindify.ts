import type { Tailwindify } from 'tailwindify-props/types';
import { DEFAULT_SCREEN } from './constants';
import { generateClassesFromValues } from './helpers/generateClassesFromValues';

export const tailwindify: Tailwindify = (classPrefix, values, defaultScreen = DEFAULT_SCREEN) => {
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
