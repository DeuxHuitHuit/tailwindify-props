"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveJavaScriptObjectAttributesValues = void 0;
const JS_OBJECT_ATTR_REGEXP = /([a-zA-Z0-9]+): ['`"]([^'`"]*)['`"](,|\s|$)/g;
/**
 * Transform javascript object keys declaration to attribute syntax, so that
 * `padding: '12|24';` becomes `padding="12|24";`
 * @param content string
 * @returns string
 */
const resolveJavaScriptObjectAttributesValues = (content) => {
    return content.replace(JS_OBJECT_ATTR_REGEXP, '$1="$2"$3');
};
exports.resolveJavaScriptObjectAttributesValues = resolveJavaScriptObjectAttributesValues;
