"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailwindify = void 0;
const constants_1 = require("./constants");
const generateClassesFromValues_1 = require("./generateClassesFromValues");
const tailwindify = (classPrefix, values, defaultScreen = constants_1.DEFAULT_SCREEN) => {
    return (0, generateClassesFromValues_1.generateClassesFromValues)(values, (value) => {
        return Array.isArray(classPrefix)
            ? classPrefix
                .map((prefix) => {
                return `${prefix}-${value}`;
            })
                .join(' ')
            : `${classPrefix}-${value}`;
    }, defaultScreen);
};
exports.tailwindify = tailwindify;
