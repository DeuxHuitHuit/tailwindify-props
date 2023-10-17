import { Replacer, Screen } from 'types.js';

export const DEFAULT_SCREEN: Screen = 'xs';

export const BASE_REPLACER: Replacer = (value, prop) => `${prop}-${value}`;
