"use strict";
/**
 * Join a URL with a baseURL. You can also optionally leave a trailing slash at the end of a URL.
 *
 * <p>If the url fragment begins with a special char, don't join with a slash.</p>
 *
 * <p> For example, if baseUrl was '/resources' and url was '.json', you'd want '/resources.json'</p>
*/
function joinUrl(url, baseUrl, removeTrailingSlash) {
    if (baseUrl === void 0) { baseUrl = '/'; }
    if (removeTrailingSlash === void 0) { removeTrailingSlash = true; }
    var delimit;
    if (baseUrl && !RegExp("^" + baseUrl).test(url)) {
        delimit = /^[\w\d]/.test(url) ? '/' : '';
        url = [baseUrl, url].join(delimit);
    }
    return removeTrailingSlash ? url.replace(/\/$/, '') : url;
}
exports.joinUrl = joinUrl;
