import { DEFAULT_SCREEN } from './constants';
import { generateClassesFromValues } from './generateClassesFromValues';
export const tailwindify = (classPrefix, values, defaultScreen = DEFAULT_SCREEN) => {
    return generateClassesFromValues(values, (value) => {
        return Array.isArray(classPrefix)
            ? classPrefix
                .map((prefix) => {
                return `${prefix}-${value}`;
            })
                .join(' ')
            : `${classPrefix}-${value}`;
    }, defaultScreen);
};
