export type ReplacerFn = (value: string, prop: string) => string;
export type Replacer = string | ReplacerFn;

export type Replacers = Record<string, Replacer>;

export type Screen = string;

export type Config = {
	defaultScreen?: Screen;
	replacers?: Replacers;
};

export type Transform = (config?: Config) => TransformFn;

export type TransformFn = (content: string) => string;
