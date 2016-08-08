/**
 * Specifies method used to change the config at runtime
 */
export interface IPersistorConfig {
    extend: (config: any) => this;
}
/**
 * Extend the base Angular RequestConfig object slightly to include
 * a few additional configurations.
 *
 * Note that with Angular's $http service, interceptors are only at
 * the provider level. But with our ResourceRequestConfig object they
 * are also available at the individual request level.
 */
export interface IHttpPersistorConfig extends ng.IRequestConfig, IPersistorConfig {
    /**
     * Base URL added to all requests. E.g. `/api/v2`
     */
    baseUrl?: string;
    /**
     * Leave or remove a trailing slash at the end of a URL.
     */
    removeTrailingSlash?: boolean;
    /**
     * Date pattern to be used when parsing JSON return.
     */
    datePattern?: RegExp;
    /**
     * Instance level interceptors. Behaves the same as those documented
     * here on the [Angular Docs](https://docs.angularjs.org/api/ng/service/$http)
     */
    interceptors?: ng.IHttpInterceptor | ng.IHttpInterceptor[];
    /**
     * This interceptor will be overwritten at runtime. When the request is being
     * created any interceptors on the Persistor are combined with interceptor(s) on
     * the Config object and all are added to this `interceptor` property.
     */
    interceptor?: ng.IHttpInterceptor;
    build: (source?, paramMap?) => IHttpPersistorConfig;
}
export declare class $httpPersistorConfig implements IHttpPersistorConfig {
    method: string;
    url: string;
    /** Add interceptor to individual request config */
    interceptor: ng.IHttpInterceptor;
    /** Map of strings or objects which will be turned to ?key1=value1&key2=value2 after the url.*/
    params: any;
    /** Data to be sent as the request message data. */
    data: string | Object;
    /** Timeout in milliseconds, or promise that should abort the request when resolved. */
    timeout: number | ng.IPromise<any>;
    /** See [XMLHttpRequest.responseType]https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#xmlhttprequest-responsetype */
    responseType: string;
    /**
     * If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory,
     * this cache will be used for caching.
     */
    cache: boolean | ng.ICacheObject;
    /**
     * Transform function or an array of such functions. The transform function takes the http request body and
     * headers and returns its transformed (typically serialized) version.
     * @see {@link https://docs.angularjs.org/api/ng/service/$http#transforming-requests-and-responses}
     */
    transformRequest: ng.IHttpRequestTransformer | ng.IHttpRequestTransformer[];
    /**
     * Transform function or an array of such functions. The transform function takes the http response body and
     * headers and returns its transformed (typically deserialized) version.
     */
    transformResponse: ng.IHttpResponseTransformer | ng.IHttpResponseTransformer[];
    /**
     * Map of strings or functions which return strings representing HTTP headers to send to the server. If the
     * return value of a function is null, the header will not be sent.
     * The key of the map is the request verb in lower case. The "common" key applies to all requests.
     * @see {@link https://docs.angularjs.org/api/ng/service/$http#setting-http-headers}
     */
    headers: ng.IHttpRequestConfigHeaders;
    /** Name of HTTP header to populate with the XSRF token. */
    xsrfHeaderName: string;
    /** Name of cookie containing the XSRF token. */
    xsrfCookieName: string;
    /**
     * whether to to set the withCredentials flag on the XHR object. See [requests with credentials]https://developer.mozilla.org/en/http_access_control#section_5 for more information.
     */
    withCredentials: boolean;
    /**
    * A function used to the prepare string representation of request parameters (specified as an object). If
    * specified as string, it is interpreted as a function registered with the $injector. Defaults to
    * $httpParamSerializer.
    */
    paramSerializer: string | ((obj: any) => string);
    constructor(options?: {});
    /**
     * Create and return a new AdapterConfig with new or updated properties assigned to it.
     */
    extend(data?: {}): this;
    /**
     * Build httpConfig object
     */
    build(source?: string | Object, paramMap?: {
        url: {
            id: string;
            ids: string;
        };
        query: {
            search: string;
            page: string;
            perPage: string;
            sortBy: string;
            sortDesc: string;
        };
    }): IHttpPersistorConfig;
}
