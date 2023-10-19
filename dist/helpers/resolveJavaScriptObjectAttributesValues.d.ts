/**
 * Transform javascript object keys declaration to attribute syntax, so that
 * `padding: '12|24';` becomes `padding="12|24";`
 * @param content string
 * @returns string
 */
export declare const resolveJavaScriptObjectAttributesValues: (content: string) => string;
