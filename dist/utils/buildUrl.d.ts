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
export declare function buildUrl(config: ng.IRequestConfig, source?: {}, map?: {}): string;
