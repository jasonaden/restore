
import {mapQueryParams} from '../utils/mapQueryParams';
import {buildUrl} from '../utils/buildUrl';
import {IResourceRequestConfig} from './interfaces';

let methods = [
    'GET',
    'PATCH',
    'PUT',
    'POST',
    'DELETE'
  ]

// Default param map
let defaultMap = {
  url: {
    id: 'id',
    ids: 'ids'
  }, 
  query: {
    search: 'search',
    page: 'page',
    perPage: 'perPage',
    sortBy: 'sortBy',
    sortDesc: 'sortDesc'
  }
}

export class ResourceAdapterConfig implements ng.IRequestConfig {

    method = 'GET';
    url = '';
    
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
    cache: boolean | ng.ICacheObject = false;

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
    
    constructor (options = {}) {
      Object.assign(this, options);
    }

    /**
     * Create a new AdapterConfig and assign data properties to it.
     */
    extend (data = {}): ResourceAdapterConfig {
      let extended = new ResourceAdapterConfig(this)
      return Object.assign(extended, data);
    }
    
    /**
     * Build httpConfig object
     */
    build (source = this.data, paramMap = defaultMap): IResourceRequestConfig {
      var config: IResourceRequestConfig = Object.assign({}, this);
      
      // Default to GET request
      config.method = config.method || 'GET';
      
      // Compile URL template
      config.url = buildUrl(config, source, paramMap.url) || config.url;
      
      // GET requests shouldn't send data in the body
      if (config.method === 'GET') {
        delete config.data;
      }
      
      // Re-map query params
      if (config.params) {
        config.params = mapQueryParams(config.params, paramMap.query);
      }
      
      return config;
    }

}