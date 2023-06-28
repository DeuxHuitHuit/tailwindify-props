import { test, expect, describe } from 'vitest';
import { convertToTailwindClasses } from '../src/helpers/convertToTailwindClasses';
import { DEFAULT_SCREEN } from '../src/constants';

describe('generateClassesFromValues()', () => {
	test('Single value', () => {
		const res = convertToTailwindClasses('attribute="default"', {}, DEFAULT_SCREEN);
		expect(res).toBe('attribute-default');
	});

	test('2 values with default screen', () => {
		const res = convertToTailwindClasses('attribute="mobile|desktop"', {}, DEFAULT_SCREEN);
		expect(res).toBe(`attribute-mobile ${DEFAULT_SCREEN}:attribute-desktop`);
	});

	test('2 values with custom screen', () => {
		const screen = 'md';
		const res = convertToTailwindClasses('attribute="mobile|desktop"', {}, screen);
		expect(res).toBe(`attribute-mobile ${screen}:attribute-desktop`);
	});

	test('Multiple values with default and custom screens', () => {
		const res = convertToTailwindClasses(
			'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			{},
			DEFAULT_SCREEN
		);
		expect(res).toBe(
			`attribute-mobile ${DEFAULT_SCREEN}:attribute-desktop md:attribute-wide hd:attribute-ultra-wide`
		);
	});

	test('Custom replacer string', () => {
		const res = convertToTailwindClasses(
			'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			{
				attribute: '$prop-test-$value'
			},
			DEFAULT_SCREEN
		);
		expect(res).toBe(
			`attribute-test-mobile ${DEFAULT_SCREEN}:attribute-test-desktop md:attribute-test-wide hd:attribute-test-ultra-wide`
		);
	});

	test('Custom replacer function', () => {
		const res = convertToTailwindClasses(
			'attribute="mobile|desktop|md:wide|hd:ultra-wide"',
			{
				attribute: (value, prop) => `${prop}-test-${value}`
			},
			DEFAULT_SCREEN
		);
		expect(res).toBe(
			`attribute-test-mobile ${DEFAULT_SCREEN}:attribute-test-desktop md:attribute-test-wide hd:attribute-test-ultra-wide`
		);
	});
});
