import { test, expect, describe } from 'vitest';
import { extractTailwindifiedProps } from '../src/helpers/extractTailwindifiedProps';

describe('extractTailwindifiedProps()', () => {
	test('no match', () => {
		expect(extractTailwindifiedProps('')).toMatchObject({});
		expect(extractTailwindifiedProps('')).not.toBeFalsy();
		expect(extractTailwindifiedProps('test')).toMatchObject({});
		expect(extractTailwindifiedProps('test')).not.toBeFalsy();
	});

	test('match single line', () => {
		expect(extractTailwindifiedProps(`tailwindify('w', wid);`)).toMatchObject({
			wid: 'w'
		});
		expect(extractTailwindifiedProps(`tailwindify('h', h)`)).toMatchObject({
			h: 'h'
		});
	});

	test('match multi-line', () => {
		expect(
			extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
		`)
		).toMatchObject({
			wid: 'w'
		});
	});

	test('match multiple', () => {
		expect(
			extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('h', hhhhh);
		`)
		).toMatchObject({
			wid: 'w',
			hhhhh: 'h'
		});
	});

	test('handle prefix array', () => {
		expect(
			extractTailwindifiedProps(`
			const c = tailwindify(['w', 'min-w'], wid);
		`)
		).toMatchObject({
			wid: ['w', 'min-w']
		});
	});

	test('handle all quote types', () => {
		expect(
			extractTailwindifiedProps(`
			const c = tailwindify(["w", \`min-w\`, 'max_w'], wid);
			const d = tailwindify(\`h\`, hei);
			const e = tailwindify("px", paddingX);
		`)
		).toMatchObject({
			wid: ['w', 'min-w', 'max_w'],
			hei: 'h',
			paddingX: 'px'
		});
	});

	test('allow duplicate', () => {
		expect(
			extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('w', wid);
			const c = tailwindify('w', wid);
		`)
		).toMatchObject({
			wid: 'w'
		});
	});

	test('prevent prop reuse', () => {
		expect(() =>
			extractTailwindifiedProps(`
			const c = tailwindify('w', wid);
			const c = tailwindify('h', wid);
		`)
		).toThrowError();
	});
});
