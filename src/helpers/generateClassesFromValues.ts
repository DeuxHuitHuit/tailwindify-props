import { Screen } from 'types.js';

type Values = string;
type GetSingleValue = (value: string) => string;

/**
 * Parses a values string, passes the split parts one at a time to the getSingleValue callback
 * and returns the resulting className string.
 * @param values
 * @param getSingleValue
 * @param defaultScreen
 * @returns The generated classes from the values string.
 */
export const generateClassesFromValues = (
	values: Values,
	getSingleValue: GetSingleValue,
	defaultScreen: Screen
) => {
	if (!values) {
		return '';
	}
	const valueParts = values.split('|');
	return valueParts
		.map((valuePart, i) => {
			const splitPart = valuePart.split(':');
			const screen =
				splitPart.length > 1 ? `${splitPart[0]}:` : i > 0 ? `${defaultScreen}:` : '';
			const value = splitPart.length > 1 ? splitPart[1] : splitPart[0];
			const classes = getSingleValue(value)
				.split(' ')
				.map((c) => `${screen}${c}`)
				.join(' ');
			return classes;
		})
		.join(' ');
};
