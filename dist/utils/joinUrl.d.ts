/**
 * Join a URL with a baseURL. You can also optionally leave a trailing slash at the end of a URL.
 *
 * <p>If the url fragment begins with a special char, don't join with a slash.</p>
 *
 * <p> For example, if baseUrl was '/resources' and url was '.json', you'd want '/resources.json'</p>
*/
export declare function joinUrl(url: string, baseUrl?: string, removeTrailingSlash?: boolean): string;
