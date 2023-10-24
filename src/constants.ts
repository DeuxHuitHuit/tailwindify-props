import type { Screen, Replacer } from 'tailwindify-props/types';

export const DEFAULT_SCREEN: Screen = 'xs';

export const BASE_REPLACER: Replacer = (value, prop) => `${prop}-${value}`;
