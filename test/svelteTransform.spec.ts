import { test, expect, describe } from 'vitest';
import { svelte } from '../src/transform';

describe('svelte()', () => {
	test('Transform: Svelte component markup', () => {
		const res = svelte({
			replacers: {
				width: 'w-$value',
				cols: 'grid-cols-$value',
				ratio: `aspect-[$value]`
			},
			defaultScreen: 'bp'
		})('<Slider width="200|400" ratio="4/3|16/9" cols="12" />');
		expect(res).toBe('<Slider w-200 bp:w-400 aspect-[4/3] bp:aspect-[16/9] grid-cols-12 />');
	});

	test('Transform: Svelte component script', () => {
		const res = svelte({
			replacers: {
				text: 'text-$value',
				width: 'w-$value',
				cols: 'grid-cols-$value'
			}
		})(`
		export let text: string = 'red';
		export let width: TW.Width | string | number = '12';
		const styles = {
			cols: '12'
		};
	`);
		expect(res).toBe(`
		export text-red
		export w-12
		const styles = {
			grid-cols-12
		};
	`);
	});

	test('Transform: svelte props with no custom replacers', () => {
		const res = svelte()(`
			export let textColor = 'red';
			export let width = '24';
		`);
		expect(res).toBe(`
			export textColor-red
			export width-24
		`);
	});

	test('Transform: svelte props with no custom replacers and tailwindify', () => {
		const res = svelte()(`
			export let textColor = 'red';
			export let width = '24';

			const colorClass = tailwindify('text', textColor);
			const widthClass = tailwindify('w', width);
		`);
		expect(res).toBe(`
			export text-red
			export w-24

			const colorClass = tailwindify('text', textColor);
			const widthClass = tailwindify('w', width);
		`);
	});
});
