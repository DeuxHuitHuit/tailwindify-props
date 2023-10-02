import { Replacer, Screen } from 'types';

export const DEFAULT_SCREEN: Screen = 'xs';

export const BASE_REPLACER: Replacer = (value, prop) => `${prop}-${value}`;
