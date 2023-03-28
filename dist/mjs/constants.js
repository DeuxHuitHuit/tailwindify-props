export const DEFAULT_SCREEN = 'xs';
/**
 * The basic replacer, which converts property="value" into property-value.
 */
export const BASE_REPLACER = '$prop-$value';
export const PROP_REGEXP = /(?<prop>[a-z0-9_$]+)(?::\s[a-z0-9<>_|\s.]+)?(:| =) '(?<value>[^']*)'/gi;
export const KEY_VALUES_REGEXP = /(?<key>[a-z0-9_$]+)="(?<values>[^"]*)"/gi;
