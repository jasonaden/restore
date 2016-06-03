import { mapQueryParams } from '../utils/mapQueryParams';
import { buildUrl } from '../utils/buildUrl';
let methods = [
    'GET',
    'PATCH',
    'PUT',
    'POST',
    'DELETE'
];
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
};
export class ResourceAdapterConfig {
    constructor(options = {}) {
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
    extend(data = {}) {
        let extended = new ResourceAdapterConfig(this);
        return Object.assign(extended, data);
    }
    /**
     * Build httpConfig object
     */
    build(source = this.data, paramMap = defaultMap) {
        var config = Object.assign({}, this);
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
