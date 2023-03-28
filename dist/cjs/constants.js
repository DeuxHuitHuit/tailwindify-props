"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_VALUES_REGEXP = exports.PROP_REGEXP = exports.BASE_REPLACER = exports.DEFAULT_SCREEN = void 0;
exports.DEFAULT_SCREEN = 'xs';
/**
 * The basic replacer, which converts property="value" into property-value.
 */
exports.BASE_REPLACER = '$prop-$value';
exports.PROP_REGEXP = /(?<prop>[a-z0-9_$]+)(?::\s[a-z0-9<>_|\s.]+)?(:| =) '(?<value>[^']*)'/gi;
exports.KEY_VALUES_REGEXP = /(?<key>[a-z0-9_$]+)="(?<values>[^"]*)"/gi;
