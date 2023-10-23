import { test, expect, describe } from 'vitest';
import { convertToTailwindClasses } from '../src/helpers/convertToTailwindClasses';
import { DEFAULT_SCREEN } from '../src/constants';

describe('generateClassesFromValues()', () => {
	test('Single value', () => {
		const res = convertToTailwindClasses({
			content: 'attribute="default"',
			replacers: {},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: []
		});
		expect(res).toBe('attribute-default');
	});

	test('2 values with default screen', () => {
		const res = convertToTailwindClasses({
			content: 'attribute="mobile|desktop"',
			replacers: {},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: []
		});
		expect(res).toBe(`attribute-mobile ${DEFAULT_SCREEN}:attribute-desktop`);
	});

	test('2 values with custom screen', () => {
		const screen = 'md';
		const res = convertToTailwindClasses({
			content: 'attribute="mobile|desktop"',
			replacers: {},
			defaultScreen: screen,
			ignoredAttributes: []
		});
		expect(res).toBe(`attribute-mobile ${screen}:attribute-desktop`);
	});

	test('Multiple values with default and custom screens', () => {
		const res = convertToTailwindClasses({
			content: 'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			replacers: {},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: []
		});
		expect(res).toBe(
			`attribute-mobile ${DEFAULT_SCREEN}:attribute-desktop md:attribute-wide hd:attribute-ultra-wide`
		);
	});

	test('Custom replacer string', () => {
		const res = convertToTailwindClasses({
			content: 'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			replacers: {
				attribute: '$prop-test-$value'
			},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: []
		});
		expect(res).toBe(
			`attribute-test-mobile ${DEFAULT_SCREEN}:attribute-test-desktop md:attribute-test-wide hd:attribute-test-ultra-wide`
		);
	});

	test('Custom replacer function', () => {
		const res = convertToTailwindClasses({
			content: 'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			replacers: {
				attribute: (value, prop) => `${prop}-test-${value}`
			},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: []
		});
		expect(res).toBe(
			`attribute-test-mobile ${DEFAULT_SCREEN}:attribute-test-desktop md:attribute-test-wide hd:attribute-test-ultra-wide`
		);
	});

	test('Transform: it does not modify ignored attributes', () => {
		const html = `<div class="text-[red] xs:text-[blue]" 
							klass="text-10 md:text-14" 
							className="text-10 md:text-14" 
							ignoreMe="block xs:hidden"
							probablyIgnoreMeAsWell="aspect-[4/3] md:text-[green]">
							Hello
					</div>`;
		const res = convertToTailwindClasses({
			content: html,
			replacers: {},
			defaultScreen: DEFAULT_SCREEN,
			ignoredAttributes: ['klass', 'className', /ignore/gi]
		});
		expect(res).toBe(html);
	});
});
