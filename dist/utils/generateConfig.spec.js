import { ResourceAdapter } from '../resources/resource-adapter';
import { generateConfig } from '../utils';
var $http;
var $q;
var adapter;
var config;
var $rootScope;
describe('generateConfig', () => {
    beforeEach(inject(function (_$http_, _$httpBackend_, _$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        adapter = new ResourceAdapter($http, $q);
        config = {
            method: 'GET',
            url: '/foo/bar'
        };
    }));
    it('is defined', () => {
        expect(generateConfig).toBeDefined();
    });
    it('returns a promise', () => {
        let request = generateConfig($q, adapter, config);
        expect(request.then).toBeDefined();
    });
    it('adds default transforms', () => {
        generateConfig($q, adapter, config).then((config) => {
            expect(config.transformResponse).toBeDefined();
            expect(config.transformRequest).toBeDefined();
        });
        $rootScope.$digest();
    });
    it('sets up default interceptors', () => {
        generateConfig($q, adapter, config).then((config) => {
            expect(config.interceptor.response).toBeDefined();
            expect(config.interceptor.responseError).toBeDefined();
        });
        $rootScope.$digest();
    });
});
