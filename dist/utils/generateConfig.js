// TODO: Get rid of $q and ng.IPromise and IResourceRequestConfig. See notes in generateConfig.specx.ts
"use strict";
var joinUrl_1 = require('./joinUrl');
function generateConfig($q, adapter, config) {
    config = Object.assign({}, config);
    config.url = joinUrl_1.joinUrl(config.url, config.baseUrl || adapter.baseUrl);
    // Add default transforms
    for (var _i = 0, _a = ['transformRequest', 'transformResponse']; _i < _a.length; _i++) {
        var method = _a[_i];
        if (config[method]) {
            config[method] = [].concat(adapter[method].bind(adapter), config[method]);
        }
        else {
            config[method] = adapter[method].bind(adapter);
        }
    }
    // Set up adapter interceptors. These will be the first interceptors to run.
    var interceptors;
    if (Array.isArray(adapter.interceptors)) {
        interceptors = adapter.interceptors;
    }
    else {
        interceptors = [adapter.interceptors];
    }
    // Sometimes the config will pass in additional interceptors. Concatinate
    // those interceptors here into the local `interceptors` array. They will 
    // then be run below when we re-create the config.interceptor object
    // as an IHttpInterceptor object.
    if (config.interceptors) {
        interceptors = interceptors.concat(config.interceptors);
    }
    // Create a single "interceptors" object that will iterate over the 
    // interceptors defined above (combination of adapter and config
    // interceptors). We are essentially taking the `response` and 
    // `responseError` properties of each interceptor object and adding
    // each of those callbacks to the promise chain.
    config.interceptor = {
        response: function (response) {
            var promise = $q.when(response);
            var icptr;
            for (var _i = 0, interceptors_1 = interceptors; _i < interceptors_1.length; _i++) {
                icptr = interceptors_1[_i];
                if (icptr.response) {
                    promise = promise.then(icptr.response);
                }
            }
            return promise;
        },
        responseError: function (response) {
            var promise = $q.reject(response);
            var icptr;
            for (var _i = 0, interceptors_2 = interceptors; _i < interceptors_2.length; _i++) {
                icptr = interceptors_2[_i];
                if (icptr.responseError) {
                    promise = promise.catch(icptr.responseError);
                }
            }
            return promise;
        }
    };
    // Config could be deferred by a request interceptor
    var request = $q.when(config);
    // Add request interceptors immediately. They will receive the `config` object 
    // and can modify it as they resolve their promises.
    var icptr;
    for (var _b = 0, interceptors_3 = interceptors; _b < interceptors_3.length; _b++) {
        icptr = interceptors_3[_b];
        if (icptr.request) {
            request = request.then(icptr.request);
        }
    }
    return request;
}
exports.generateConfig = generateConfig;
