import { ResourceAdapterConfig } from './resource-adapter-config';
describe("ResourceAdapterConfig", () => {
    let adapterConfig;
    beforeEach(() => {
        adapterConfig = new ResourceAdapterConfig({
            url: '/my-resource/{{@id}}',
            method: 'POST',
            transformResponse: function (data) {
                return data;
            },
            interceptor: {
                request: function (request) {
                    return request;
                },
                response: function (response) {
                    return response;
                },
                responseError: function (response) {
                    return $q.reject(response);
                }
            }
        });
    });
    /**
     * Begin Tests
     */
    it('creates an instance of ResourceAdapterConfig', function () {
        expect(adapterConfig instanceof ResourceAdapterConfig).toBe(true);
    });
    it('extends/inherits an instance', function () {
        adapterConfig = adapterConfig.extend({
            url: '/my-resource/123'
        });
        expect(adapterConfig.method).toBe('POST');
        expect(adapterConfig.url).toBe('/my-resource/123');
        expect(typeof adapterConfig.interceptor).toBe('object');
        expect(typeof adapterConfig.transformResponse).toBe('function');
        expect(adapterConfig instanceof ResourceAdapterConfig).toBe(true);
    });
    it('defaults to GET request', () => {
        adapterConfig = adapterConfig.extend({ method: null });
        expect(adapterConfig.build().method).toBe('GET');
    });
    it('defaults source property to configObject.data', () => {
        adapterConfig = adapterConfig.extend({ method: 'PUT', data: { id: 101 } });
        expect(adapterConfig.build().url).toBe('/my-resource/101');
    });
    it('uses configObject.params to replace non-@ prefixed params in query string', () => {
        adapterConfig = adapterConfig.extend({
            url: adapterConfig.url + '?q={{query}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                query: 'something'
            }
        });
        expect(adapterConfig.build().url).toBe('/my-resource/101?q=something');
    });
    it('uses configObject.params to replace non-@ prefixed params in path body', () => {
        // And in path body
        adapterConfig = adapterConfig.extend({
            url: adapterConfig.url + '/{{id}}',
            method: 'PUT',
            data: { id: 101 },
            params: {
                id: 102
            }
        });
        expect(adapterConfig.build().url).toBe('/my-resource/101/102');
    });
});
