import { test, expect } from 'vitest';
import { DEFAULT_SCREEN } from '../src/constants';
import { resolvePropValues, convertToTailwindClasses, svelte } from '../src/transform';

test('resolvePropValues: No effect', () => {
	const res = resolvePropValues('this is random content test="value"');
	expect(res).toBe('this is random content test="value"');
});

test('resolvePropValues: Exported prop test', () => {
	const res = resolvePropValues(`export let borderColor: TW.Colors = 'black';`);
	expect(res).toBe('export let borderColor="black";');
});

test('resolvePropValues: Single line object test', () => {
	const res = resolvePropValues(`{ borderColor: 'black', padding: '4' }`);
	expect(res).toBe('{ borderColor="black", padding="4" }');
});

test('resolvePropValues: Multiline object test', () => {
	const res = resolvePropValues(
		` {
			borderColor: 'black',
			padding: '4',
			cols: '12'
		} `
	);
	expect(res).toBe(` {
			borderColor="black",
			padding="4",
			cols="12"
		} `);
});

test('convertToTailwindClasses: no effect', () => {
	const res = convertToTailwindClasses('this is random content test-value', {}, DEFAULT_SCREEN);
	expect(res).toBe('this is random content test-value');
});

test('convertToTailwindClasses: No custom replacers', () => {
	const res = convertToTailwindClasses(
		'this is random content mt="20" w="4|8" pt="28|32|sm:40"',
		{},
		DEFAULT_SCREEN
	);
	expect(res).toBe('this is random content mt-20 w-4 xs:w-8 pt-28 xs:pt-32 sm:pt-40');
});

test('convertToTailwindClasses: No custom replacers, with custom values', () => {
	const res = convertToTailwindClasses(
		'this is random content mt="20" w="4|8" pt="28|[32vw]|sm:[90vw]"',
		{},
		DEFAULT_SCREEN
	);
	expect(res).toBe('this is random content mt-20 w-4 xs:w-8 pt-28 xs:pt-[32vw] sm:pt-[90vw]');
});

test('convertToTailwindClasses: With custom replacer strings', () => {
	const res = convertToTailwindClasses(
		'this is random content marginTop="20" width="4|8" paddingTop="28|32|sm:40"',
		{
			marginTop: 'mt-$value',
			width: 'w-$value',
			paddingTop: 'pt-$value'
		},
		DEFAULT_SCREEN
	);
	expect(res).toBe('this is random content mt-20 w-4 xs:w-8 pt-28 xs:pt-32 sm:pt-40');
});

test('convertToTailwindClasses: With custom replacer functions', () => {
	const res = convertToTailwindClasses(
		'this is random content marginTop="20" width="4|8" paddingTop="28|32|sm:40"',
		{
			marginTop: (value) => `mt-${value}`,
			width: (value) => `w-${value}`,
			paddingTop: (value) => `totally-diffrent-from-paddingTop-${value}`
		},
		DEFAULT_SCREEN
	);
	expect(res).toBe(
		'this is random content mt-20 w-4 xs:w-8 totally-diffrent-from-paddingTop-28 xs:totally-diffrent-from-paddingTop-32 sm:totally-diffrent-from-paddingTop-40'
	);
});

test('convertToTailwindClasses: similar class name', () => {
	const res = convertToTailwindClasses(
		'export text="t"; export border="black"; export borderColor="white";',
		{},
		DEFAULT_SCREEN
	);
	expect(res).toBe('export text-t; export border-black; export border-color-white;');
});

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
