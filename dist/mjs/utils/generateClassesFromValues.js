export const generateClassesFromValues = (values, getSingleValue, defaultScreen) => {
    if (!values) {
        return '';
    }
    const valueParts = values.split('|');
    return valueParts
        .map((valuePart, i) => {
        const splitPart = valuePart.split(':');
        const screen = splitPart.length > 1 ? `${splitPart[0]}:` : i > 0 ? `${defaultScreen}:` : '';
        const value = splitPart.length > 1 ? splitPart[1] : splitPart[0];
        const classes = getSingleValue(value)
            .split(' ')
            .map((c) => `${screen}${c}`)
            .join(' ');
        return classes;
    })
        .join(' ');
};