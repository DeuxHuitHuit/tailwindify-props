"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelte = void 0;
const constants_1 = require("./constants");
const extractTailwindifiedProps_1 = require("./helpers/extractTailwindifiedProps");
const mergeUnknownPropsIntoReplacers_1 = require("./helpers/mergeUnknownPropsIntoReplacers");
const resolveTypesScriptAttributesValues_1 = require("./helpers/resolveTypesScriptAttributesValues");
const resolveJavaScriptObjectAttributesValues_1 = require("./helpers/resolveJavaScriptObjectAttributesValues");
const convertToTailwindClasses_1 = require("./helpers/convertToTailwindClasses");
/**
 * Replaces svelte properties with their tailwind compatible syntax.
 */
const svelte = (config) => {
    const configReplacers = (config === null || config === void 0 ? void 0 : config.replacers) || {};
    const defaultScreen = (config === null || config === void 0 ? void 0 : config.defaultScreen) || constants_1.DEFAULT_SCREEN;
    return (content) => {
        // Extract prop names from tailwindify
        const props = (0, extractTailwindifiedProps_1.extractTailwindifiedProps)(content);
        // Merge with replacers
        const replacers = (0, mergeUnknownPropsIntoReplacers_1.mergeUnknownPropsIntoReplacers)(configReplacers, props);
        // Convert TypeScript declarations into attributes
        content = (0, resolveTypesScriptAttributesValues_1.resolveTypesScriptAttributesValues)(content);
        // Convert JavaScript object keys into attributes
        content = (0, resolveJavaScriptObjectAttributesValues_1.resolveJavaScriptObjectAttributesValues)(content);
        // Pass all converters on the resulting string
        content = (0, convertToTailwindClasses_1.convertToTailwindClasses)(content, replacers, defaultScreen);
        // Restore Tailwind's own Svelte transform
        // github.com/tailwindlabs/tailwindcss/blob/55653ba0041cf2806f236f00c59307b12f757385/src/jit/lib/expandTailwindAtRules.js#L23
        content = content.replace(/(?:^|\s)class:/g, ' ');
        return content;
    };
};
exports.svelte = svelte;
