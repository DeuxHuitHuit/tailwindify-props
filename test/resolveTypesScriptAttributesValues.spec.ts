import { test, expect, describe } from 'vitest';
import { resolveTypesScriptAttributesValues } from '../src/helpers/resolveTypesScriptAttributesValues';

describe('resolveTypesScriptAttributesValues()', () => {
	test('complete test', () => {
		const res = resolveTypesScriptAttributesValues(
			` export let borderColor: TW.Colors = 'black'; `
		);
		expect(res).toBe(' export borderColor="black" ');
	});
	test('single quotes', () => {
		const res = resolveTypesScriptAttributesValues(` export let borderColor = 'black'; `);
		expect(res).toBe(' export borderColor="black" ');
	});
	test('backticks', () => {
		const res = resolveTypesScriptAttributesValues(` export let borderColor = \`black\`; `);
		expect(res).toBe(' export borderColor="black" ');
	});
	test('integer value', () => {
		const res = resolveTypesScriptAttributesValues(` export let borderSize = "12"; `);
		expect(res).toBe(' export borderSize="12" ');
	});
	test('float value', () => {
		const res = resolveTypesScriptAttributesValues(` export let borderSize = "12.2"; `);
		expect(res).toBe(' export borderSize="12.2" ');
	});
	test('responsive values', () => {
		const res = resolveTypesScriptAttributesValues(` export let borderSize = "12|16"; `);
		expect(res).toBe(' export borderSize="12|16" ');
	});
	test('multiple responsive values', () => {
		const res = resolveTypesScriptAttributesValues(
			` export let borderSize = "12|xs:16|sm:18"; `
		);
		expect(res).toBe(' export borderSize="12|xs:16|sm:18" ');
	});
});
