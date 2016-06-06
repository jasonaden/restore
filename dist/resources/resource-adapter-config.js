"use strict";
var mapQueryParams_1 = require('../utils/mapQueryParams');
var buildUrl_1 = require('../utils/buildUrl');
var methods = [
    'GET',
    'PATCH',
    'PUT',
    'POST',
    'DELETE'
];
// Default param map
var defaultMap = {
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
};
var ResourceAdapterConfig = (function () {
    function ResourceAdapterConfig(options) {
        if (options === void 0) { options = {}; }
        this.method = 'GET';
        this.url = '';
        /**
         * If true, a default $http cache will be used to cache the GET request, otherwise if a cache instance built with $cacheFactory,
         * this cache will be used for caching.
         */
        this.cache = false;
        Object.assign(this, options);
    }
    /**
     * Create a new AdapterConfig and assign data properties to it.
     */
    ResourceAdapterConfig.prototype.extend = function (data) {
        if (data === void 0) { data = {}; }
        var extended = new ResourceAdapterConfig(this);
        return Object.assign(extended, data);
    };
    /**
     * Build httpConfig object
     */
    ResourceAdapterConfig.prototype.build = function (source, paramMap) {
        if (source === void 0) { source = this.data; }
        if (paramMap === void 0) { paramMap = defaultMap; }
        var config = Object.assign({}, this);
        // Default to GET request
        config.method = config.method || 'GET';
        // Compile URL template
        config.url = buildUrl_1.buildUrl(config, source, paramMap.url) || config.url;
        // GET requests shouldn't send data in the body
        if (config.method === 'GET') {
            delete config.data;
        }
        // Re-map query params
        if (config.params) {
            config.params = mapQueryParams_1.mapQueryParams(config.params, paramMap.query);
        }
        return config;
    };
    return ResourceAdapterConfig;
}());
exports.ResourceAdapterConfig = ResourceAdapterConfig;
