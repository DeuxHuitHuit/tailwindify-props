import { test, expect } from 'vitest';
import { svelte } from '../src/transform';

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

test('Transform: Svelte script', () => {
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
		export let text-red;
		export let w-12;
		const styles = {
			grid-cols-12
		};
	`);
});
