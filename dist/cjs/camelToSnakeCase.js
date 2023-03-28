"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToKebabCase = void 0;
const camelToKebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
exports.camelToKebabCase = camelToKebabCase;
