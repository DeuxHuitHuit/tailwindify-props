declare module 'tailwindify-props/types' {
	export type ReplacerFn = (value: string, prop: string) => string;
	export type Replacer = string | ReplacerFn;

	export type Replacers = Record<string, Replacer>;

	export type ExtractedTailwindifiedPropsPrefix = string | string[];

	export type ExtractedTailwindifiedProps = Record<string, ExtractedTailwindifiedPropsPrefix>;

	export type Screen = string;

	export type IgnoredAttribute = string | RegExp;

	export type IgnoredAttributes = IgnoredAttribute[];

	export type Config = {
		replacers?: Replacers;
		defaultScreen?: Screen;
		ignoredAttributes?: IgnoredAttributes;
	};

	export type Transform = (config?: Config) => TransformFn;

	export type TransformFn = (content: string) => string;

	export type Tailwindify = (
		classPrefix: string | string[],
		values: string,
		defaultScreen?: Screen
	) => string;
}

declare module 'tailwindify-props' {
	export const tailwindify: import('tailwindify-props/types').Tailwindify;
}

declare module 'tailwindify-props/transform' {
	export const ts: import('tailwindify-props/types').Transform;
	export const js: import('tailwindify-props/types').Transform;
	export const svelte: import('tailwindify-props/types').Transform;
}
