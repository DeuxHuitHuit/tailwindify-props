import { test, expect, describe } from 'vitest';
import { resolveJavaScriptObjectAttributesValues } from '../src/helpers/resolveJavaScriptObjectAttributesValues';

describe('resolveJavaScriptObjectAttributesValues()', () => {
	test('single line test', () => {
		const res = resolveJavaScriptObjectAttributesValues(
			` { borderColor: 'black', padding: '4' } `
		);
		expect(res).toBe(' {  borderColor="black" ,  padding="4"  } ');
	});

	test('multiline line test', () => {
		const res = resolveJavaScriptObjectAttributesValues(
			` {
			borderColor: \`black\`,
			padding: "4",
			cols: '12'
		} `
		);
		expect(res).toBe(` {
			 borderColor="black" ,
			 padding="4" ,
			 cols="12" 
		} `);
	});
});
