"use strict";
var _http_persistor_config_1 = require('./$http-persistor-config');
describe("$httpPersistorConfig", function () {
    var persistorConfig;
    beforeEach(function () {
        persistorConfig = new _http_persistor_config_1.$httpPersistorConfig({
            url: '/my-resource/{{@id}}',
            method: 'POST',
            transformResponse: function (data) {
                return data;
            },
            interceptor: {
                request: function (config) {
                    return config;
                },
                response: function (response) {
                    return response;
                },
                responseError: function (rejection) {
                    return Promise.reject(rejection);
                }
            }
        });
    });
    /**
     * Begin Tests
     */
    it('creates an instance of $httpPersistorConfig', function () {
        expect(persistorConfig instanceof _http_persistor_config_1.$httpPersistorConfig).toBe(true);
    });
    it('extends/inherits an instance', function () {
        persistorConfig = persistorConfig.extend({
            url: '/my-resource/123'
        });
        expect(persistorConfig.method).toBe('POST');
        expect(persistorConfig.url).toBe('/my-resource/123');
        expect(typeof persistorConfig.interceptor).toBe('object');
        expect(typeof persistorConfig.transformResponse).toBe('function');
        expect(persistorConfig instanceof _http_persistor_config_1.$httpPersistorConfig).toBe(true);
    });
    it('defaults to GET request', function () {
        persistorConfig = persistorConfig.extend({ method: null });
        expect(persistorConfig.build().method).toBe('GET');
    });
    it('defaults source property to configObject.data', function () {
        persistorConfig = persistorConfig.extend({ method: 'PUT', data: { id: 101 } });
        expect(persistorConfig.build().url).toBe('/my-resource/101');
    });
    it('uses configObject.params to replace non-@ prefixed params in query string', function () {
        persistorConfig = persistorConfig.extend({
            url: persistorConfig.url + '?q={{query}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                query: 'something'
            }
        });
        expect(persistorConfig.build().url).toBe('/my-resource/101?q=something');
    });
    it('uses configObject.params to replace non-@ prefixed params in path body', function () {
        // And in path body
        persistorConfig = persistorConfig.extend({
            url: persistorConfig.url + '/{{id}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                id: 102
            }
        });
        expect(persistorConfig.build().url).toBe('/my-resource/101/102');
    });
});
