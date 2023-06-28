import { Screen, Replacers } from '../types';
import { generateClassesFromValues } from './generateClassesFromValues';

export const convertToTailwindClasses = (
	content: string,
	replacers: Replacers,
	defaultScreen: Screen
) => {
	return (
		Object.entries(replacers)
			// replace all instances of each reducers
			.reduce((content, [replacerKey, replacer]) => {
				const replacerRegExp = new RegExp(
					`(${replacerKey})(?::\\s[a-z0-9<>_|\\s.]+)?\\s?([:=])\\s?['"](?<values>[^\\s]*)['"]`,
					'gi'
				);
				return content.replace(replacerRegExp, (match, ...rest) => {
					const { values } = rest[rest.length - 1] as { values: string };
					if (!values) {
						return match;
					}
					return generateClassesFromValues(
						values,
						(value: string) => {
							if (typeof replacer === 'function') {
								return replacer(value, replacerKey);
							}
							if (typeof replacer === 'string') {
								return replacer
									.replace(/\$prop/g, replacerKey)
									.replace(/\$value/g, value);
							}
							return value;
						},
						defaultScreen
					);
				});
			}, content)
	);
};
