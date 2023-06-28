import { test, expect, describe } from 'vitest';
import { duplicateResponsiveAttributes } from '../src/helpers/duplicateResponsiveAttributes';

describe('duplicateResponsiveAttributes()', () => {
	test('no effect', () => {
		const res = duplicateResponsiveAttributes('this is content test="value" random');
		expect(res).toBe('this is content test="value" random');
	});

	test('broken tag', () => {
		const res = duplicateResponsiveAttributes('this is> content <test="value" random');
		expect(res).toBe('this is> content <test="value" random');
	});

	test('duplicates', () => {
		const res = duplicateResponsiveAttributes('this is content test="mobile|desktop" random');
		expect(res).toBe('this is content test="mobile" bp:test="desktop" random');
	});

	test('duplicates with :', () => {
		const res = duplicateResponsiveAttributes('<tag ratio="4:3|16:9" random></tag>');
		expect(res).toBe('<tag ratio="4:3" bp:ratio="16:9" random></tag>');
	});
});
