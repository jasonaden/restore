"use strict";
var getPath_1 = require('./getPath');
/**
 * Build a URL based on a format such as this:
 *
 * ```
 * var url = '/api/cases/{{@caseId}}/replies/{{@id}}
 * ```
 *
 * Using `@` in front of a parameter means that value lives on the `source` object.
 * So if we are saving a case, `buildUrl(config, myCase)` mapped to a url like
 * `/api/cases/{{@id}}` will look to `myCase.id` to replace the `{{@id}}` parameter.
 *
 * You can also specify parameters that are not on the source object. So a URL like
 * this: `/api/custom/{{myParam}}` can still be parsed. TODO: Finish this doc when
 * I know how to do it.
 *
 * You can also read into nested objects when building a URL. In the first example
 * suppose the URL looked like this instead:
 *
 * ```
 * var url = '/api/cases/{{@case.id}}/replies/{{@id}}
 * ```
 *
 * `buildUrl` will still work as it will take `case.id` and split on `.` and walk
 * the object path.
 *
 * @param config  config  Object containing the HTTP configuration
 * @param source  source  Object (or resource) we are operating on. If we are saving
 *                        a Case, for instance, this would be an object representing
 *                        the case being saved
 * @param map     map     Map of key pairs used to change property names. Example:
 *
 * ```
 * var myData = {id: 1, longPropertyName: true};
 *
 * // In the URL use "id" but map to "longPropertyName"
 * var url = buildUrl({url: '/api/data/{{@id}}}, myData, {id: "longPropertyName"});
 *
 * ```
 */
function buildUrl(config, source, map) {
    if (source === void 0) { source = {}; }
    if (map === void 0) { map = {}; }
    var url = config.url;
    // Find ID {{@id}} or /{{@id}}
    var reId = /\/?{{@id}}.*$/;
    if (!url)
        return '';
    // Strip @id from end of url on POST requests
    if (config.method === 'POST' && url.match(reId)) {
        url = url.replace(reId, '');
    }
    /**
     * replacer function will receive a template such as `{{@id}}` or
     * `{{@case.id}}` or something like that.
     */
    return url.replace(/(\{\{[^\{\}]+\}\})/g, function replacer(tpl) {
        // Create the param without `{{` and `}}`
        var param = tpl.slice(2, -2);
        // If there is a source object, we could be saving an existing item. Check 
        // the param for `@` which indicates the param lives on the source object.
        if (source && param[0] === '@') {
            // Drop the "@" and split on ".". Then we can walk the path to find 
            // the data for this param.
            var path = param.slice(1).split('.');
            var key = path.pop();
            key = map[key] || key;
            if (key[0] === '@') {
                key = key.slice(1);
            }
            path.push(key);
            return getPath_1.getPath(source, path.join('.')) || '';
        }
        else if (param[0] !== '@' && config.params) {
            var val = config.params[param];
            delete config.params[param];
            return val || '';
        }
        else {
            return tpl;
        }
    });
}
exports.buildUrl = buildUrl;
