import { DEFAULT_SCREEN } from '../constants';

const RESP_ATTR_REGEXP = /([a-zA-Z0-9]+)="([^\|"]+)\|([^"]+)"/g;

/**
 * Duplicate all properties that contain our special pipe syntax
 * for responsive values, so that `attribute="mobile|desktop"` becomes
 * `attribute="mobile" <screen>:attribute="desktop"`.
 * @param value string
 * @returns string
 */
export const duplicateResponsiveAttributes = (content: string) => {
	return content.replace(RESP_ATTR_REGEXP, `$1="$2" ${DEFAULT_SCREEN}$1="$3"`);
};
