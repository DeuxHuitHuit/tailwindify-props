"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTypesScriptAttributesValues = void 0;
const TS_ATTR_REGEXP = /(let|const) ([a-zA-Z0-9_]+)(?:: ([a-zA-Z0-9<>_\. \|]+))? = ['`"]([^'`"]*)['`"];/g;
/**
 * Transform typescript variables declaration to attribute syntax, so that
 * `const padding: PxUnit = '12|24';` becomes `padding="12|24";`
 * @param content string
 * @returns string
 */
const resolveTypesScriptAttributesValues = (content) => {
    return content.replace(TS_ATTR_REGEXP, '$2="$4"');
};
exports.resolveTypesScriptAttributesValues = resolveTypesScriptAttributesValues;
