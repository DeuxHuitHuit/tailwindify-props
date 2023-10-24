import type { Screen, Replacers, IgnoredAttributes } from 'tailwindify-props/types';
import { BASE_REPLACER } from '../constants';
import { generateClassesFromValues } from './generateClassesFromValues';

type Params = {
	content: string;
	replacers: Replacers;
	defaultScreen: Screen;
	ignoredAttributes: IgnoredAttributes;
};

const DISALLOWED_ATTRIBUTES = ['class'];

const RESP_ATTR_REGEXP = /(?<attribute>[a-zA-Z0-9]+)="(?<values>[^"]+)"/g;

const isIgnored = (attr: string, ignoredAttributes: IgnoredAttributes) => {
	return [...ignoredAttributes, ...DISALLOWED_ATTRIBUTES].some((ignoredAttribute) => {
		if (typeof ignoredAttribute === 'string') {
			return ignoredAttribute === attr;
		}
		if (ignoredAttribute instanceof RegExp) {
			return ignoredAttribute.test(attr);
		}
		return false;
	});
};

/**
 * Convert responsive attributes to Tailwind classes, so that:
 * - attribute="mobile|desktop" becomes attribute-mobile <default-screen>:attribute-desktop
 * - attribute="mobile|md:desktop" attribute-mobile md:attribute-desktop
 * - attribute="mobile|md:desktop|hd:wide" attribute-mobile md:attribute-desktop hd:attribute-wide
 */
export const convertToTailwindClasses = ({
	content,
	replacers,
	defaultScreen,
	ignoredAttributes
}: Params) => {
	return content.replace(RESP_ATTR_REGEXP, (match, ...rest) => {
		const { values, attribute } = rest[rest.length - 1] as {
			attribute: string;
			values: string;
		};
		if (isIgnored(attribute, ignoredAttributes)) {
			return match;
		}
		if (!values) {
			return match;
		}
		const replacer = replacers[attribute] || BASE_REPLACER;
		return generateClassesFromValues(
			values,
			(value: string) => {
				if (typeof replacer === 'function') {
					return replacer(value, attribute);
				}
				if (typeof replacer === 'string') {
					return replacer.replace(/\$prop/g, attribute).replace(/\$value/g, value);
				}
				return value;
			},
			defaultScreen
		);
	});
};
