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
