// import { test, expect } from 'vitest';
// import { tailwindify } from '../src/tailwindify';

// test('Works properly: width', () => {
// 	const tailwindified = tailwindify('w', '400');
// 	expect(tailwindified).toBe('w-400');
// });

// test('Works properly: height', () => {
// 	const tailwindified = tailwindify('h', '400');
// 	expect(tailwindified).toBe('h-400');
// });

// test('Works properly with custom value: gap', () => {
// 	const tailwindified = tailwindify('gap', '[9px]');
// 	expect(tailwindified).toBe('gap-[9px]');
// });

// test('Properly breaks appart responsive syntax: width', () => {
// 	const tailwindified = tailwindify('w', '400|200');
// 	expect(tailwindified).toBe('w-400 xs:w-200');
// });

// test('Properly breaks appart responsive syntax: height', () => {
// 	const tailwindified = tailwindify('h', '300|100');
// 	expect(tailwindified).toBe('h-300 xs:h-100');
// });

// test('Properly breaks appart custom values', () => {
// 	const tailwindified = tailwindify('w', '[mobile]|[desktop]');
// 	expect(tailwindified).toBe('w-[mobile] xs:w-[desktop]');
// });

// test('Uses the provided default screen prefix', () => {
// 	const tailwindified = tailwindify('w', '[mobile]|[desktop]', 'sm');
// 	expect(tailwindified).toBe('w-[mobile] sm:w-[desktop]');
// });

// test('Properly renders more than 2 breakpoints', () => {
// 	const tailwindified = tailwindify('w', '100|200|sm:300|lg:500');
// 	expect(tailwindified).toBe('w-100 xs:w-200 sm:w-300 lg:w-500');
// });

// test('Properly renders more than 2 breakpoints with a custom default screen', () => {
// 	const tailwindified = tailwindify('w', '100|200|sm:300|lg:500', 'xl');
// 	expect(tailwindified).toBe('w-100 xl:w-200 sm:w-300 lg:w-500');
// });

// test('Properly renders multiple classes', () => {
// 	const tailwindified = tailwindify(['w', 'h', 'pt'], '100|200');
// 	expect(tailwindified).toBe('w-100 h-100 pt-100 xs:w-200 xs:h-200 xs:pt-200');
// });

// test('Properly renders multiple classes with custom screen', () => {
// 	const tailwindified = tailwindify(['w', 'h', 'pt'], '100|200', 'sm');
// 	expect(tailwindified).toBe('w-100 h-100 pt-100 sm:w-200 sm:h-200 sm:pt-200');
// });

// test('Properly renders multiple classes with more than 2 breakpoints', () => {
// 	const tailwindified = tailwindify(['w', 'h', 'pt'], '100|200|sm:300|xl:500');
// 	expect(tailwindified).toBe(
// 		'w-100 h-100 pt-100 xs:w-200 xs:h-200 xs:pt-200 sm:w-300 sm:h-300 sm:pt-300 xl:w-500 xl:h-500 xl:pt-500'
// 	);
// });

// test('Properly renders multiple classes with more than 2 breakpoints and a custom default screen', () => {
// 	const tailwindified = tailwindify(['w', 'h', 'pt'], '100|200|sm:300|xl:500', 'lg');
// 	expect(tailwindified).toBe(
// 		'w-100 h-100 pt-100 lg:w-200 lg:h-200 lg:pt-200 sm:w-300 sm:h-300 sm:pt-300 xl:w-500 xl:h-500 xl:pt-500'
// 	);
// });
