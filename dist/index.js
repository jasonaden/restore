var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("utils/mapQueryParams", ["require", "exports"], function (require, exports) {
    "use strict";
    // From DsResourceAdapterConfig
    function mapQueryParams(params, queryMap) {
        var key, map, paramsCopy, value;
        if (!(params && queryMap)) {
            return;
        }
        paramsCopy = {};
        for (key in params) {
            value = params[key];
            if (map = queryMap[key]) {
                switch (typeof map) {
                    case 'string':
                        paramsCopy[map] = value;
                        break;
                    case 'function':
                        Object.assign(paramsCopy, map(value));
                }
            }
            else {
                paramsCopy[key] = value;
            }
        }
        return paramsCopy;
    }
    exports.mapQueryParams = mapQueryParams;
});
define("utils/getPath", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * From ds.Util.getPath
     */
    function getPath(obj, path, setPath) {
        if (path === void 0) { path = ""; }
        var aPath = path.split(".");
        var target = obj;
        while (aPath.length && target) {
            var key = aPath.shift();
            if (key) {
                if ((typeof target[key] === 'undefined' || !aPath.length) && typeof setPath !== 'undefined') {
                    target[key] = aPath.length ? {} : setPath;
                }
                target = target[key];
            }
        }
        return target;
    }
    exports.getPath = getPath;
});
define("utils/buildUrl", ["require", "exports", "utils/getPath"], function (require, exports, getPath_1) {
    "use strict";
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
});
define("resources/resource-adapter-config", ["require", "exports", "utils/mapQueryParams", "utils/buildUrl"], function (require, exports, mapQueryParams_1, buildUrl_1) {
    "use strict";
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
});
define("resources/interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("actions/action", ["require", "exports"], function (require, exports) {
    "use strict";
    function action(type, suffix, payload) {
        return { type: type + "_" + suffix, payload: payload };
    }
    exports.action = action;
});
define("resources/constants", ["require", "exports"], function (require, exports) {
    "use strict";
    // ACTION TYPES
    exports.FIND_ONE = "FIND_ONE";
    exports.FINDING_ONE = "FINDING_ONE";
    exports.FOUND_ONE = "FOUND_ONE";
    exports.FIND = "FIND";
    exports.FINDING = "FINDING";
    exports.FOUND = "FOUND";
    exports.ADD = "ADD";
    exports.ADDING = "ADDING";
    exports.ADDED = "ADDED";
    exports.DESTROY = "DESTROY";
    exports.DESTROYING = "DESTROYING";
    exports.DESTROYED = "DESTROYED";
    exports.PATCH = "PATCH";
    exports.PATCHING = "PATCHING";
    exports.PATCHED = "PATCHED";
    exports.UPDATE = "UPDATE";
    exports.UPDATING = "UPDATING";
    exports.UPDATED = "UPDATED";
    exports.REFRESH = "REFRESH";
    exports.REFRESHING = "REFRESHING";
    exports.REFRESHED = "REFRESHED";
    exports.ERROR = "ERROR";
});
define("utils/tokenize", ["require", "exports"], function (require, exports) {
    "use strict";
    function tokenize(str, ignorePattern) {
        if (str === void 0) { str = ""; }
        if (ignorePattern === void 0) { ignorePattern = ""; }
        return str
            .replace(new RegExp("([^A-Z])([A-Z])", "g"), '$1 $2')
            .replace(new RegExp("([^A-Za-z0-9 " + ignorePattern + "]*)([A-Za-z0-9 " + ignorePattern + "]*)", "g"), ' $2')
            .replace(new RegExp("[ ]+", "g"), ' ')
            .trim();
    }
    exports.tokenize = tokenize;
});
define("utils/toCamelCase", ["require", "exports", "utils/tokenize"], function (require, exports, tokenize_1) {
    "use strict";
    function toCamelCase(string) {
        if (!string) {
            return;
        }
        string = tokenize_1.tokenize(string).replace(/[ ](\w)/g, function (g0, g1, g2) { return g1.toUpperCase(); });
        return string = string[0].toLowerCase() + string.slice(1);
    }
    exports.toCamelCase = toCamelCase;
});
define("utils/toLoudSnakeCase", ["require", "exports", "utils/tokenize"], function (require, exports, tokenize_2) {
    "use strict";
    function toLoudSnakeCase(string) {
        if (string) {
            return tokenize_2.tokenize(string).replace(/[ ]/g, '_').toUpperCase();
        }
    }
    exports.toLoudSnakeCase = toLoudSnakeCase;
});
define("utils/splitSchema", ["require", "exports", 'normalizr', "actions/action", "resources/constants", "utils/toCamelCase", "utils/toLoudSnakeCase"], function (require, exports, normalizr_1, action_1, constants_1, toCamelCase_1, toLoudSnakeCase_1) {
    "use strict";
    function splitSchema(schema, name, data) {
        // Lowercase the schema name
        name = name.toLowerCase();
        return function (dispatch, store) {
            var normalized = normalizr_1.normalize(data.entries, normalizr_1.arrayOf(schema));
            // This is for testing only. If no results are returned, Normalizr will 
            // return result: [ undefined ] and entities[entity] = {undefined:{}}.
            if (normalized.result[0] === undefined) {
                normalized.result.length = 0;
                normalized.entities[toCamelCase_1.toCamelCase(name)] = {};
            }
            // Dispatch event for the main data that was gathered on this request.
            // This includes metadata about the collection.
            dispatch(action_1.action(constants_1.FIND, name.toUpperCase(), {
                result: normalized.result,
                items: normalized.entities[toCamelCase_1.toCamelCase(name)],
                meta: {
                    count: data.total_entries,
                    page: data.page,
                    links: data._links
                }
            }));
            // Iterate over other objects that were returned (normalized) and 
            // dispatch add actions for them to get them into the store.
            for (var x in normalized.entities) {
                // Exclude main entity
                if (toLoudSnakeCase_1.toLoudSnakeCase(x) !== toLoudSnakeCase_1.toLoudSnakeCase(name)) {
                    // Iterate over each object passed back and dispatch ADD action
                    for (var y in normalized.entities[x]) {
                        dispatch(action_1.action(constants_1.ADD, toLoudSnakeCase_1.toLoudSnakeCase(x), normalized.entities[x][y]));
                    }
                }
            }
        };
    }
    exports.splitSchema = splitSchema;
});
define("actions/action-config", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("actions/find", ["require", "exports", "actions/action", "resources/constants", "utils/splitSchema"], function (require, exports, action_2, constants_2, splitSchema_1) {
    "use strict";
    function find(config, args) {
        return function (dispatch, store) {
            dispatch(action_2.action(constants_2.FINDING, config.className));
            // TODO: This should not be tied to an HTTP request. What if the 
            // data needs to be stored in local storage? Should simply tell 
            // the adapter to load something and pass config data.
            return config.adapter.execute(config)
                .then(function (res) {
                dispatch(splitSchema_1.splitSchema(config.schema, config.className, res.data));
                return res.data;
            }, function (error) {
                dispatch(action_2.action(constants_2.ERROR, config.className, error));
                return config.$q.reject(error);
            });
        };
    }
    exports.find = find;
});
define("actions/findOne", ["require", "exports", "actions/action", "resources/constants", "utils/splitSchema"], function (require, exports, action_3, constants_3, splitSchema_2) {
    "use strict";
    function findOne(config, args) {
        return function (dispatch, store) {
            dispatch(action_3.action(constants_3.FINDING_ONE, config.className));
            return config.adapter.execute({
                url: config.url,
                method: 'GET'
            })
                .then(function (res) {
                dispatch(splitSchema_2.splitSchema(config.schema, config.className, res.data));
                return res.data;
            }, function (error) {
                dispatch(action_3.action(constants_3.ERROR, config.className, error));
                return config.$q.reject(error);
            });
        };
    }
    exports.findOne = findOne;
});
define("actions/destroy", ["require", "exports", "actions/action", "resources/constants", "utils/splitSchema"], function (require, exports, action_4, constants_4, splitSchema_3) {
    "use strict";
    // TODO: Implement this function. Need to configure what to do after destroying server-side.
    function destroy(config, id, args) {
        return function (dispatch, store) {
            dispatch(action_4.action(constants_4.DESTROYING, config.className));
            return config.adapter.execute({
                url: id,
                method: 'DELETE'
            })
                .then(function (res) {
                alert("Need to implement what to do after delete (remove from store)");
                dispatch(splitSchema_3.splitSchema(config.schema, config.className, res.data));
                return res.data;
            }, function (error) {
                dispatch(action_4.action(constants_4.ERROR, config.className, error));
                return config.$q.reject(error);
            });
        };
    }
    exports.destroy = destroy;
});
define("utils/joinUrl", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Join a URL with a baseURL. You can also optionally leave a trailing slash at the end of a URL.
     *
     * <p>If the url fragment begins with a special char, don't join with a slash.</p>
     *
     * <p> For example, if baseUrl was '/resources' and url was '.json', you'd want '/resources.json'</p>
    */
    function joinUrl(url, baseUrl, removeTrailingSlash) {
        if (baseUrl === void 0) { baseUrl = '/'; }
        if (removeTrailingSlash === void 0) { removeTrailingSlash = true; }
        var delimit;
        if (baseUrl && !RegExp("^" + baseUrl).test(url)) {
            delimit = /^[\w\d]/.test(url) ? '/' : '';
            url = [baseUrl, url].join(delimit);
        }
        return removeTrailingSlash ? url.replace(/\/$/, '') : url;
    }
    exports.joinUrl = joinUrl;
});
define("utils/transform", ["require", "exports"], function (require, exports) {
    "use strict";
    function transform(object, callback) {
        var walk;
        walk = function (object, key) {
            var k, v, value;
            value = object[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (!value.hasOwnProperty(k))
                        continue;
                    if (typeof (v = walk(value, k)) !== 'undefined') {
                        value[k] = v;
                    }
                    else {
                        delete value[k];
                    }
                }
            }
            return callback.call(object, key, value);
        };
        return walk({
            '': object
        }, '');
    }
    exports.transform = transform;
});
define("utils/parseJson", ["require", "exports", "utils/transform"], function (require, exports, transform_1) {
    "use strict";
    function parseJson(datePattern, revive, data, headers) {
        if (datePattern === void 0) { datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/; }
        if (revive === void 0) { revive = function (k, v) { return v; }; }
        var reviver = function (key, value) {
            if (typeof value == 'string' && value.match(datePattern)) {
                return new Date(value);
            }
            else {
                return revive.call(this, key, value);
            }
        };
        var data;
        if (typeof data === 'string') {
            data = JSON.parse(data, reviver);
        }
        else if (data != null) {
            transform_1.transform(data, reviver);
        }
        return data;
    }
    exports.parseJson = parseJson;
});
define("utils/flattenEmbedded", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Takes HAL formatted response data and flattens the embedded data into
     * the base object. Example:
     *
     * ```
     * // Data In:
     * {
     *   _embedded: {
     *     customer: {
     *       id: 1,
     *       name: 'John'
     *     }
     *   },
     *   id: 1,
     *   name: 'John\'s Case'
     * }
     *
     * // Returns:
     * {
     *   _embedded: {
     *     customer: {
     *       id: 1,
     *       name: 'John'
     *     }
     *   },
     *   id: 1,
     *   name: 'John\'s Case'
     *   customer: {
     *     id: 1,
     *     name: 'John'
     *   }
     * }
     *
     * ```
     */
    function flattenEmbedded(data, headers) {
        if (!data || !data._embedded)
            return data;
        // Verify this is HAL and check if we're dealing with embedded 
        // objects (like from an endpoint returning multiple entries)
        if (data._embedded.entries && Array.isArray(data._embedded.entries)) {
            data._embedded.entries = data._embedded.entries.map(flatten);
        }
        // Then always flatten
        return flatten(data);
        function flatten(data) {
            if (data._embedded) {
                for (var key in data._embedded) {
                    data[key] = data._embedded[key];
                }
            }
            return data;
        }
    }
    exports.flattenEmbedded = flattenEmbedded;
});
define("utils/generateConfig", ["require", "exports", "utils/joinUrl"], function (require, exports, joinUrl_1) {
    "use strict";
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
});
define("utils", ["require", "exports", "utils/joinUrl", "utils/transform", "utils/parseJson", "utils/flattenEmbedded", "utils/generateConfig"], function (require, exports, joinUrl_2, transform_2, parseJson_1, flattenEmbedded_1, generateConfig_1) {
    "use strict";
    exports.joinUrl = joinUrl_2.joinUrl;
    exports.transform = transform_2.transform;
    exports.parseJson = parseJson_1.parseJson;
    exports.flattenEmbedded = flattenEmbedded_1.flattenEmbedded;
    exports.generateConfig = generateConfig_1.generateConfig;
});
define("resources/resource", ["require", "exports", "actions/find", "actions/findOne", "actions/destroy", "actions/action", "resources/constants"], function (require, exports, find_1, findOne_1, destroy_1, action_5, constants_5) {
    "use strict";
    /**
     *
     */
    var Resource = (function () {
        /**
         * The Resource class is designed to be extended, rather than instantiated on its own.
         * Because it's extended, Angular's DI system will not pick up on the constructor
         * arguments, so anything Resource needs must be passed in. This is why the first
         * argument is `$injector` so the Resource can grab the services it needs.
         *
         * @param $injector $injector   Angular's injector. Inject this into the parent class
         *                              constructor and pass to the super() call.
         * @param adapter adapter       The ResourceAdapter instance to use in this Resource.
         * @param schema Schema         The Normalizr schema to use when parsing API data
         *                              returned for this Resource.
         */
        function Resource($ngRedux, $http, $q, adapter, schema) {
            this.adapter = adapter;
            this.schema = schema;
            this.store = $ngRedux;
            this.$http = $http;
            this.$q = $q;
        }
        Object.defineProperty(Resource.prototype, "state", {
            get: function () {
                return this._state[this.className.toLowerCase()] || {};
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Resource.prototype, "_state", {
            get: function () {
                return this.store.getState().entities || {};
            },
            enumerable: true,
            configurable: true
        });
        // TODO: ADD METHODS TO GET DATA OUT OF THE RESOURCE.
        /**
         * Check whether this resource type is loading or optionally a specific resource.
         *
         * Example:
         *
         * ```
         * Case.isLoading(); // Checks whether loadMany is being run
         *
         * Case.isLoading(5); // Checks whether we are fetching a specific case
         * ```
         */
        Resource.prototype.isLoading = function (id) {
            // Check by ID
            if (id) {
                return false;
            }
            else {
                var s = this.state;
                return !!(s.adding || s.deleting || s.loadingMany || s.loadingOne || s.patching);
            }
        };
        /**
         * Lifecycle Hooks:
         *
         * * `beforeCreate(payload[, cb])`
         * * `afterCreate(payload[, cb])`
         */
        Resource.prototype.add = function (payload, config) {
            var _this = this;
            return this.$q.when(this.beforeAdd(payload, config))
                .then(function (args) { return _this.store.dispatch(add(_this, payload, config)); })
                .then(function (data) { return _this.afterAdd(data); });
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.beforeAdd = function (payload, config) {
            return this.$q.when(config).then(function (config) { return [payload, config]; });
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.afterAdd = function (data) {
            return this.$q.when(data);
        };
        /**
         * Lifecycle Hooks:
         *
         * * `beforeUpdate(payload[, cb])`
         * * `afterUpdate(payload[, cb])`
         */
        Resource.prototype.update = function (payload) {
            return action_5.action(constants_5.UPDATE, this.className, payload);
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.beforeUpdate = function (config) {
            return this.$q.when(config);
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.afterUpdate = function (data) {
            return this.$q.when(data);
        };
        /**
         * Saves data. Will determine whether to create or update.
         *
         * For Lifecycle hooks, see `add` or `update`.
         */
        Resource.prototype.save = function (payload) {
            return action_5.action(constants_5.ADD, this.className, payload);
        };
        /**
         * Removes an item from the store.
         *
         * * `beforeDestroy(payload[, cb])`
         * * `afterDestroy(payload[, cb])`
         */
        Resource.prototype.destroy = function (payload, config) {
            var _this = this;
            var id = this.adapter.generateSlug(payload);
            return this.$q.when(this.beforeDestroy(id, config))
                .then(function (args) { return _this.store.dispatch(destroy_1.destroy(_this, id, config)); })
                .then(function (data) { return _this.afterFind(data); });
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.beforeDestroy = function (id, config) {
            return this.$q.when(config);
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.afterDestroy = function (data) {
            return this.$q.when(data);
        };
        /**
         * Finds items and puts them into the store.
         *
         * * `beforeFind(payload[, cb])`
         * * `afterFind(payload[, cb])`
         */
        Resource.prototype.find = function (args) {
            var _this = this;
            return this.$q.when(this.beforeFind(args))
                .then(function (args) { return _this.store.dispatch(find_1.find(_this, args)); })
                .then(function (data) { return _this.afterFind(data); });
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.beforeFind = function (config) {
            return this.$q.when(config);
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.afterFind = function (data) {
            return this.$q.when(data);
        };
        /**
         * Finds a single and puts it into the store.
         *
         * * `beforeFindOne(payload[, cb])`
         * * `afterFindOne(payload[, cb])`
         */
        Resource.prototype.findOne = function (id, config) {
            var _this = this;
            return this.$q.when(this.beforeFindOne(id, config))
                .then(function (args) { return _this.store.dispatch(findOne_1.findOne(_this, args)); })
                .then(function (data) { return _this.afterFindOne(data); });
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.beforeFindOne = function (id, config) {
            return this.$q.when(config);
        };
        /**
         * Default identity hook (return what was passed in)
         */
        Resource.prototype.afterFindOne = function (data) {
            return this.$q.when(data);
        };
        Resource.prototype.reloadMany = function () {
            this.store.dispatch(action_5.action(constants_5.REFRESH, this.className, []));
            this.find();
        };
        return Resource;
    }());
    exports.Resource = Resource;
});
define("resources/resource-reducer", ["require", "exports", "resources/constants"], function (require, exports, constants_6) {
    "use strict";
    function defaultEntityState() {
        return {
            result: [],
            loadingMany: false,
            loadingOne: false,
            deleting: false,
            patching: false,
            adding: false,
            items: {},
        };
    }
    /**
     * Generic reducer for items of any type (entities). Produces a state tree like:
     *
     * ```
     *  entities = {
     *    cases: {
     *      // sequence of cases as returned from most recent API call
     *      result: [6, 3, 5, ...],
     *      loadingMany: true,
     *      loadingOne: true,
     *      deleting: false,
     *      patching: false,
     *      adding: false,
     *      items: {
     *        3: {...},
     *        5: {...},
     *        6: {...},
     *        ...
     *      },
     *      meta: {
     *        count: 100,
     *        page: 2,
     *        links: {
     *          ...
     *        }
     *      }
     *    }
     *  }
     * ```
     */
    function defaultReducer(type) {
        /**
         * Simple function for concatinating the type const with the type value.
         *
         * ```
         *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
         * ```
         */
        function t(str, type) {
            return str + '_' + type;
        }
        return function (state, action) {
            if (state === void 0) { state = defaultEntityState(); }
            var s = Object.assign({}, state);
            if (!action) {
                return state;
            }
            switch (action.type) {
                // SETUP ACTIONABLE ITEMS
                case constants_6.FINDING + "_" + type:
                    return Object.assign(s, { loadingMany: true });
                case constants_6.FINDING_ONE + "_" + type:
                    return Object.assign(s, { loadingOne: true });
                case constants_6.DESTROYING + "_" + type:
                    return Object.assign(s, { deleting: true });
                case constants_6.PATCHING + "_" + type:
                    return Object.assign(s, { patching: true });
                case constants_6.ADDING + "_" + type:
                    return Object.assign(s, { adding: true });
                // This is the load many action. FIND_CASE for instance vs FIND_ONE_CASE.
                case t(constants_6.FIND, type):
                    // Turn off loading indicator
                    s.loadingMany = false;
                    // Apply the sequenced result array
                    s.result = action.payload.result.slice(0);
                    // Iterate results and add each item
                    s.items = Object.assign({}, s.items);
                    s.result.forEach(function (key) {
                        s.items[key] = action.payload.items[key];
                    });
                    // Apply metadata
                    s.meta = Object.assign({}, action.payload.meta);
                    return s;
                case t(constants_6.FIND_ONE, type):
                    debugger;
                    return s;
                case t(constants_6.ADD, type):
                    s.items = Object.assign({}, s.items);
                    s.items[action.payload._links.self.href] = action.payload;
                    return s;
                // TODO: ERROR CASE
                default:
                    return state;
            }
        };
    }
    exports.defaultReducer = defaultReducer;
});
define("resources/resource-adapter", ["require", "exports", "utils", "resources/resource-adapter-config"], function (require, exports, utils_1, resource_adapter_config_1) {
    "use strict";
    /*
    * Base Adapter for an API. The adapter handles
    */
    var ResourceAdapter = (function () {
        function ResourceAdapter($http, $q, config) {
            if (config === void 0) { config = new resource_adapter_config_1.ResourceAdapterConfig(); }
            this.$http = $http;
            this.$q = $q;
            this.config = config;
            // Base URL for the API
            this.baseUrl = "/";
            // Do or don't remove trailing slash 
            this.removeTrailingSlash = true;
            // Date pattern to be used to find dates in returns from the API
            this.datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
            if (!this.interceptors) {
                this.interceptors = [];
            }
        }
        ResourceAdapter.prototype.generateSlug = function (entity) {
            return entity.id;
        };
        // Execute request based on given DsResourceAdapterConfig
        ResourceAdapter.prototype.execute = function (config) {
            var requestConfig = this.config.extend(config).build();
            return this.doRequest(requestConfig);
        };
        // Default reviver (override this)
        ResourceAdapter.prototype.reviver = function (key, value) {
            return value;
        };
        ResourceAdapter.prototype.doRequest = function (config) {
            var _this = this;
            return utils_1.generateConfig(this.$q, this, config)
                .then(function (config) { return _this.$http(config)
                .then(config.interceptor.response, config.interceptor.responseError); });
        };
        // Default response transform
        ResourceAdapter.prototype.transformResponse = function (data, headers) {
            return utils_1.parseJson(this.datePattern, this.reviver, data, headers);
        };
        // Default request transform
        ResourceAdapter.prototype.transformRequest = function (data, headers) {
            return JSON.stringify(data, function (key, value) {
                if (['@viewModel', '@descriptor'].indexOf(key) == -1) {
                    return value;
                }
            });
        };
        return ResourceAdapter;
    }());
    exports.ResourceAdapter = ResourceAdapter;
});
define("index", ["require", "exports", "resources/resource", "resources/resource-reducer", "resources/resource-adapter", "utils", "resources/constants"], function (require, exports, resource_1, resource_reducer_1, resource_adapter_1, utils_2, constants_7) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    // Resource class
    exports.Resource = resource_1.Resource;
    // resource reducer
    exports.defaultReducer = resource_reducer_1.defaultReducer;
    // interfaces
    // don't need to export since they will be in .d.ts file?
    // resource-adapter
    exports.ResourceAdapter = resource_adapter_1.ResourceAdapter;
    // utils
    exports.flattenEmbedded = utils_2.flattenEmbedded;
    exports.generateConfig = utils_2.generateConfig;
    exports.joinUrl = utils_2.joinUrl;
    exports.parseJson = utils_2.parseJson;
    exports.transform = utils_2.transform;
    __export(constants_7);
});
// this file is only being used by karma
require('phantomjs-polyfill');
requireAll(require.context("./", true, /spec.ts$/));
function requireAll(r) {
    r.keys().forEach(r);
}
define("actions/add", ["require", "exports", "actions/action", "resources/constants", "utils/splitSchema"], function (require, exports, action_6, constants_8, splitSchema_4) {
    "use strict";
    // TODO: Implement this function. Need to configure what to do after adding.
    function add(config, payload, args) {
        return function (dispatch, store) {
            dispatch(action_6.action(constants_8.ADDING, config.className));
            return config.adapter.execute({
                url: config.url,
                method: 'POST'
            })
                .then(function (res) {
                alert("Need to implement what to do after ADD (ADD TO STORE)");
                dispatch(splitSchema_4.splitSchema(config.schema, config.className, res.data));
                return res.data;
            }, function (error) {
                alert('Error adding!');
                dispatch(action_6.action(constants_8.ERROR, config.className, error));
                return config.$q.reject(error);
            });
        };
    }
    exports.add = add;
});
define("resources/module", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("resources/resource-adapter-config.spec", ["require", "exports", "resources/resource-adapter-config"], function (require, exports, resource_adapter_config_2) {
    "use strict";
    describe("ResourceAdapterConfig", function () {
        var adapterConfig;
        beforeEach(function () {
            adapterConfig = new resource_adapter_config_2.ResourceAdapterConfig({
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
            expect(adapterConfig instanceof resource_adapter_config_2.ResourceAdapterConfig).toBe(true);
        });
        it('extends/inherits an instance', function () {
            adapterConfig = adapterConfig.extend({
                url: '/my-resource/123'
            });
            expect(adapterConfig.method).toBe('POST');
            expect(adapterConfig.url).toBe('/my-resource/123');
            expect(typeof adapterConfig.interceptor).toBe('object');
            expect(typeof adapterConfig.transformResponse).toBe('function');
            expect(adapterConfig instanceof resource_adapter_config_2.ResourceAdapterConfig).toBe(true);
        });
        it('defaults to GET request', function () {
            adapterConfig = adapterConfig.extend({ method: null });
            expect(adapterConfig.build().method).toBe('GET');
        });
        it('defaults source property to configObject.data', function () {
            adapterConfig = adapterConfig.extend({ method: 'PUT', data: { id: 101 } });
            expect(adapterConfig.build().url).toBe('/my-resource/101');
        });
        it('uses configObject.params to replace non-@ prefixed params in query string', function () {
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
        it('uses configObject.params to replace non-@ prefixed params in path body', function () {
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
});
define("resources/resource-adapter.spec", ["require", "exports", "resources/resource-adapter", "resources/resource-adapter-config", 'angular-mocks'], function (require, exports, resource_adapter_2, resource_adapter_config_3) {
    "use strict";
    var $httpBackend;
    var $q;
    var $http;
    var adapter;
    var config;
    describe('ResourceAdapter', function () {
        beforeEach(inject(function (_$http_, _$httpBackend_, _$q_) {
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            adapter = new resource_adapter_2.ResourceAdapter($http, $q);
            config = new resource_adapter_config_3.ResourceAdapterConfig({});
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        xdescribe('execute', function () {
            it('runs ResourceAdapterConfig.build()', function () {
                // This test should work, but doesn't because spyOn causes an error to be thrown
                // spyOn(config, 'build');
                // $httpBackend.whenGET(config.url).respond(200);
                // adapter.execute(config);
                // $httpBackend.flush();
                // expect(config.build).toHaveBeenCalled();
            });
        });
        describe('makes GET requests', function () {
            beforeEach(function () {
                config = config.extend({
                    url: '/foo/{{@id}}',
                    method: 'GET'
                });
            });
            it('to listing URLs', function () {
                $httpBackend.expectGET('/foo').respond(200);
                adapter.execute(config);
                $httpBackend.flush();
            });
            it('to item URLs', function () {
                config = config.extend({ data: {
                        id: 1
                    } });
                $httpBackend.expectGET('/foo/1').respond(200);
                adapter.execute(config);
                $httpBackend.flush();
            });
            it('adds params to query string', function () {
                config = config.extend({
                    data: { id: 1 },
                    params: { order: 'desc' }
                });
                $httpBackend.expectGET('/foo/1?order=desc').respond(200);
                adapter.execute(config);
                $httpBackend.flush();
            });
        }); // makes GET requests
        describe('makes POST requests', function () {
            beforeEach(function () {
                config = config.extend({
                    url: '/foo/{{@id}}',
                    method: 'POST',
                    data: {
                        subject: "New Item"
                    }
                });
            });
            it('POSTs the data in data property', function () {
                $httpBackend.expectPOST('/foo').respond(201);
                adapter.execute(config);
                $httpBackend.flush();
            });
            it('drops ID param on POST even if it exists in data prop', function () {
                config = config.extend({
                    data: {
                        id: 1,
                        subject: "New Item"
                    }
                });
                $httpBackend.expectPOST('/foo').respond(201);
                adapter.execute(config);
                $httpBackend.flush();
            });
            it('adds params to query string', function () {
                config = config.extend({
                    params: { order: 'desc' }
                });
                $httpBackend.expectPOST('/foo?order=desc').respond(201);
                adapter.execute(config);
                $httpBackend.flush();
            });
        }); // makes POST requests
        describe('makes PUT & PATCH requests', function () {
            beforeEach(function () {
                config = config.extend({
                    url: '/foo/{{@id}}',
                    method: 'PUT',
                    data: {
                        id: 101,
                        subject: "Updated Item"
                    }
                });
            });
            it('PUTs & PATCHes the data in data property', function () {
                // PUT
                $httpBackend.expectPUT('/foo/101').respond(200);
                adapter.execute(config);
                $httpBackend.flush();
                // PATCH
                $httpBackend.expectPATCH('/foo/101').respond(200);
                config = config.extend({ method: 'PATCH' });
                adapter.execute(config);
                $httpBackend.flush();
            });
            it('adds params to query string', function () {
                config = config.extend({
                    params: { order: 'desc' }
                });
                // PUT
                $httpBackend.expectPUT('/foo/101?order=desc').respond(200);
                adapter.execute(config);
                $httpBackend.flush();
                // PATCH
                $httpBackend.expectPATCH('/foo/101?order=desc').respond(200);
                config = config.extend({ method: 'PATCH' });
                adapter.execute(config);
                $httpBackend.flush();
            });
        }); // makes PUT requests
        describe('performs transformations', function () {
            beforeEach(function () {
                config = config.extend({
                    method: 'GET',
                    url: '/foo/bar'
                });
            });
            it('on a response', function () {
                config = config.extend({
                    transformResponse: function (response) {
                        response.name = 'Mr. ' + response.name;
                        return response;
                    }
                });
                $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
                adapter.execute(config).then(function (response) {
                    expect(response.data.name).toBe('Mr. Smith');
                });
                $httpBackend.flush();
            });
            it('on  a request', function () {
                config = config.extend({
                    method: 'POST',
                    data: { name: 'Smith' },
                    transformRequest: function (request) {
                        var data = JSON.parse(request);
                        data.name = 'Mr. ' + data.name;
                        return data;
                    }
                });
                $httpBackend.expectPOST(config.url, { name: 'Mr. Smith' }).respond(200);
                adapter.execute(config);
                $httpBackend.flush();
            });
        }); // performs transformations
        describe('allows custom interceptors', function () {
            beforeEach(function () {
                config = config.extend({
                    method: 'GET',
                    url: '/foo/bar'
                });
            });
            it('allows custom interceptors for a response', function () {
                var response = null;
                config = config.extend({
                    interceptors: {
                        response: function (cfg) {
                            cfg.data.name = 'Mr. ' + cfg.data.name;
                            return cfg;
                        }
                    }
                });
                $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
                adapter.execute(config).then(function (res) {
                    response = res.data;
                });
                $httpBackend.flush();
                expect(response).toEqual({ name: 'Mr. Smith' });
            });
            it('allows custom interceptors for a response error', function () {
                var error = null;
                var errorResponse = 'Error!';
                config = config.extend({
                    interceptors: {
                        responseError: function (rejection) {
                            rejection.data = errorResponse;
                            return $q.reject(rejection);
                        }
                    }
                });
                $httpBackend.whenGET(config.url).respond(500);
                adapter.execute(config).catch(function (err) {
                    error = err.data;
                });
                $httpBackend.flush();
                expect(error).toEqual(errorResponse);
            });
        }); // allows custom interceptors
    });
});
define("resources/resource-reducer.spec", ["require", "exports", "resources/resource-reducer", "resources/constants", 'angular-mocks'], function (require, exports, resource_reducer_2, constants_9) {
    "use strict";
    var type = 'CASE';
    var reducer;
    describe('defaultReducer', function () {
        beforeEach(function () {
            reducer = resource_reducer_2.defaultReducer(type);
        });
        it('returns a default state', function () {
            expect(reducer(undefined, {})).toEqual({
                result: [],
                loadingMany: false,
                loadingOne: false,
                deleting: false,
                patching: false,
                adding: false,
                items: {}
            });
        });
        it('should handle FINDING_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.FINDING + "_" + type
            })).toEqual({
                result: [],
                loadingMany: true,
                loadingOne: false,
                deleting: false,
                patching: false,
                adding: false,
                items: {}
            });
        });
        it('should handle FINDING_ONE_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.FINDING_ONE + "_" + type,
            })).toEqual({
                result: [],
                loadingMany: false,
                loadingOne: true,
                deleting: false,
                patching: false,
                adding: false,
                items: {}
            });
        });
        it('should handle DESTROYING_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.DESTROYING + "_" + type
            })).toEqual({
                result: [],
                loadingMany: false,
                loadingOne: false,
                deleting: true,
                patching: false,
                adding: false,
                items: {}
            });
        });
        it('should handle PATCHING_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.PATCHING + "_" + type
            })).toEqual({
                result: [],
                loadingMany: false,
                loadingOne: false,
                deleting: false,
                patching: true,
                adding: false,
                items: {}
            });
        });
        it('should handle ADDING_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.ADDING + "_" + type
            })).toEqual({
                result: [],
                loadingMany: false,
                loadingOne: false,
                deleting: false,
                patching: false,
                adding: true,
                items: {}
            });
        });
        it('should handle FIND_CASE', function () {
            expect(reducer(undefined, {
                type: constants_9.FIND + "_" + type,
                payload: {
                    result: ['/cases/1'],
                    items: {
                        '/cases/1': {
                            _links: { self: { href: '/cases/1' } }, _embedded: { entries: [{}] }
                        }
                    }
                }
            })).toEqual({
                result: ['/cases/1'],
                loadingMany: false,
                loadingOne: false,
                deleting: false,
                patching: false,
                adding: false,
                items: {
                    '/cases/1': {
                        _links: { self: { href: '/cases/1' } }, _embedded: { entries: [{}] }
                    }
                },
                meta: {}
            });
        });
    });
});
define("resources/resource.spec", ["require", "exports", "resources/resource", 'redux-mock-store', 'redux-thunk', 'normalizr'], function (require, exports, resource_2, configureMockStore, thunk, normalizr_2) {
    "use strict";
    var middlewares = [thunk];
    var mockStore = configureMockStore(middlewares);
    var $httpBackend;
    var $rootScope;
    var store = mockStore({});
    ;
    var url = 'http://localhost:8888/api/v2/testResource';
    var response = {
        "total_entries": 1,
        "page": 1,
        "_links": {
            "self": {
                "href": "/api/v2/testResource?page=1&per_page=50",
                "class": "page"
            }
        },
        "_embedded": {
            "entries": [
                {
                    "id": 1,
                    "subject": "Test Resource subject",
                    "_links": {
                        "self": {
                            "href": "/api/v2/testResource/1",
                            "class": "testResource"
                        }
                    }
                }
            ]
        }
    };
    xdescribe('Resource', function () {
        var schema = new normalizr_2.Schema('testResource');
        var _TestResource_ = (function (_super) {
            __extends(_TestResource_, _super);
            function _TestResource_($ngRedux, $http, $q, ApiV2Adapter) {
                _super.call(this, $ngRedux, $http, $q, ApiV2Adapter, schema);
                this.className = 'TEST_RESOURCE';
                this.url = '/testResource';
            }
            return _TestResource_;
        }(resource_2.Resource));
        var TestResource;
        beforeEach(angular.mock.module('app'));
        beforeEach(angular.mock.module(function ($provide) {
            $provide.service('TestResource', _TestResource_);
        }));
        beforeEach(inject(function (_$httpBackend_, _$rootScope_, _TestResource_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            TestResource = _TestResource_;
            // Mock the store
            TestResource.store = store;
            TestResource.store.clearActions();
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should have isLoading method default to false', function () {
            expect(TestResource.isLoading()).toBe(false);
        });
        it('should have isLoading(id) method default to false', function () {
            expect(TestResource.isLoading(1)).toBe(false);
        });
        describe('find()', function () {
            it('dispatches the proper actions on error', function () {
                var actions;
                $httpBackend.whenGET(url).respond(500, response);
                TestResource.find().catch(function (error) {
                    actions = [
                        { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                        { type: 'ERROR_TEST_RESOURCE', payload: error }
                    ];
                });
                $httpBackend.flush();
                expect(TestResource.store.getActions()).toEqual(actions);
            });
            it('dispatches the proper actions on success', function () {
                var actions = [
                    { type: 'FINDING_TEST_RESOURCE', payload: undefined },
                    { type: 'FIND_TEST_RESOURCE', payload: {
                            result: [1],
                            items: {
                                '1': {
                                    "id": 1,
                                    "subject": "Test Resource subject",
                                    "_links": {
                                        "self": {
                                            "href": "/api/v2/testResource/1",
                                            "class": "testResource"
                                        }
                                    }
                                }
                            },
                            meta: {
                                count: 1,
                                page: 1,
                                links: {
                                    self: {
                                        href: '/api/v2/testResource?page=1&per_page=50',
                                        class: 'page'
                                    }
                                }
                            }
                        }
                    }
                ];
                $httpBackend.whenGET(url).respond(200, response);
                TestResource.find();
                $httpBackend.flush();
                expect(TestResource.store.getActions()).toEqual(actions);
            });
            it('calls before and after lifecycle hooks', function () {
                spyOn(TestResource, 'beforeFind').and.callThrough();
                spyOn(TestResource, 'afterFind').and.callThrough();
                $httpBackend.whenGET(url).respond(200, response);
                TestResource.find();
                $httpBackend.flush();
                expect(TestResource.beforeFind).toHaveBeenCalled();
                expect(TestResource.afterFind).toHaveBeenCalled();
            });
            it('returns a promise resolving with listing data from API', function () {
                $httpBackend.whenGET(url).respond(200, response);
                TestResource.find().then(function (cases) {
                    expect(cases).toBeDefined();
                    // Verify cases come back in "pure" API format
                    expect({}).toEqual({});
                });
                $httpBackend.flush();
            });
        });
    });
});
define("utils/buildUrl.spec", ["require", "exports", "utils/buildUrl"], function (require, exports, buildUrl_2) {
    "use strict";
    describe('buildUrl', function () {
        it('returns a basic URL', function () {
            var config = {
                url: '/thing',
                method: 'POST'
            };
            var url = buildUrl_2.buildUrl(config);
            expect(url).toBe(config.url);
        });
        it('returns empty string if there is no config.url', function () {
            var config = {
                url: undefined,
                method: 'POST'
            };
            var url = buildUrl_2.buildUrl(config);
            expect(url).toBe('');
        });
        it('drops ID param on POST', function () {
            var config = {
                url: '/thing/{{@id}}',
                method: 'POST'
            };
            var config2 = {
                url: '/thing/{{@thingId}}/thang/{{@id}}',
                method: 'POST'
            };
            var source = {};
            var source2 = {
                id: 1,
                thingId: 2
            };
            var url = buildUrl_2.buildUrl(config, source);
            var url2 = buildUrl_2.buildUrl(config2, source2);
            expect(url).toBe('/thing');
            expect(url2).toBe('/thing/2/thang');
        });
        it('replaces ID param on PUT', function () {
            var config = {
                url: '/thing/{{@id}}',
                method: 'PUT'
            };
            var source = {
                id: 11
            };
            var url = buildUrl_2.buildUrl(config, source);
            expect(url).toBe('/thing/11');
        });
        it('replaces @param values from source', function () {
            var config = {
                url: '/thing/{{@thingId}}/thang/{{@id}}',
                method: 'GET'
            };
            var source = {
                id: 1,
                thingId: 2
            };
            var url = buildUrl_2.buildUrl(config, source);
            expect(url).toBe('/thing/2/thang/1');
        });
        it('replaces @thing.param values from source', function () {
            var config = {
                url: '/thing/{{@thang.id}}',
                method: 'GET'
            };
            var source = {
                thang: {
                    id: 2
                }
            };
            var url = buildUrl_2.buildUrl(config, source);
            expect(url).toBe('/thing/2');
        });
        it('replaces `{{something}}` from config.params and removes from config.params', function () {
            var config = {
                url: '/thing/{{@id}}?filter={{filter}}',
                method: 'GET',
                params: {
                    filter: 'priority'
                }
            };
            var source = {
                id: 2
            };
            var url = buildUrl_2.buildUrl(config, source);
            expect(url).toBe('/thing/2?filter=priority');
        });
        it('maps object keys using the map param', function () {
            var config = {
                url: '/thing/{{@id}}',
                method: 'GET'
            };
            var source = {
                longThingId: 2
            };
            var url = buildUrl_2.buildUrl(config, source, { id: "longThingId" });
            expect(url).toBe('/thing/2');
        });
    });
});
define("utils/flattenEmbedded.spec", ["require", "exports", "utils"], function (require, exports, utils_3) {
    "use strict";
    describe('flattenEmbedded', function () {
        it('flattens embedded data', function () {
            var value = 'some value';
            var data = {
                _embedded: {
                    p: value
                }
            };
            var flattened = utils_3.flattenEmbedded(data);
            expect(flattened.p).toBe(value);
        });
    });
});
define("utils/generateConfig.spec", ["require", "exports", "resources/resource-adapter", "utils"], function (require, exports, resource_adapter_3, utils_4) {
    "use strict";
    var $http;
    var $q;
    var adapter;
    var config;
    var $rootScope;
    describe('generateConfig', function () {
        beforeEach(inject(function (_$http_, _$httpBackend_, _$q_, _$rootScope_) {
            $q = _$q_;
            $rootScope = _$rootScope_;
            adapter = new resource_adapter_3.ResourceAdapter($http, $q);
            config = {
                method: 'GET',
                url: '/foo/bar'
            };
        }));
        it('is defined', function () {
            expect(utils_4.generateConfig).toBeDefined();
        });
        it('returns a promise', function () {
            var request = utils_4.generateConfig($q, adapter, config);
            expect(request.then).toBeDefined();
        });
        it('adds default transforms', function () {
            utils_4.generateConfig($q, adapter, config).then(function (config) {
                expect(config.transformResponse).toBeDefined();
                expect(config.transformRequest).toBeDefined();
            });
            $rootScope.$digest();
        });
        it('sets up default interceptors', function () {
            utils_4.generateConfig($q, adapter, config).then(function (config) {
                expect(config.interceptor.response).toBeDefined();
                expect(config.interceptor.responseError).toBeDefined();
            });
            $rootScope.$digest();
        });
    });
});
define("utils/getPath.spec", ["require", "exports", "utils/getPath"], function (require, exports, getPath_2) {
    "use strict";
    describe('getPath', function () {
        it('pulls data from the base of an object', function () {
            var obj = {
                id: 101
            };
            expect(getPath_2.getPath(obj));
        });
    });
});
define("utils/joinUrl.spec", ["require", "exports", "utils/joinUrl"], function (require, exports, joinUrl_3) {
    "use strict";
    describe('joinUrl', function () {
        var baseUrl = '/base-url';
        it('does not join with a slash if the URL begins with a special character', function () {
            var url = '.json';
            var joined = joinUrl_3.joinUrl(url, baseUrl, undefined);
            expect(joined).toEqual('/base-url.json');
        });
        it('joins a URL', function () {
            var url = 'resources/';
            var joined = joinUrl_3.joinUrl(url, baseUrl, undefined);
            expect(joined).toEqual('/base-url/resources');
        });
        it('allows the trailing slash to be preserved', function () {
            var url = 'resources/';
            var removeTrailingSlash = false;
            var joined = joinUrl_3.joinUrl(url, baseUrl, removeTrailingSlash);
            expect(joined).toEqual('/base-url/resources/');
        });
    });
});
define("utils/parseJson.spec", ["require", "exports", "utils/parseJson"], function (require, exports, parseJson_2) {
    "use strict";
    describe('parseJson', function () {
        it('allows a custom reviver', function () {
            var reviver = function (key, value) {
                if (key === '') {
                    return value;
                }
                return value * 2;
            };
            var data = '{ "p": 5 }';
            var parsed = parseJson_2.parseJson(undefined, reviver, data, undefined);
            expect(parsed.p).toBe(10);
        });
        it('parses JSON', function () {
            var data = '{ "foo": "bar" }';
            var parsed = parseJson_2.parseJson(undefined, undefined, data, undefined);
            expect(parsed).toEqual({
                foo: 'bar'
            });
        });
        it('creates date objects', function () {
            var comparisonDate = new Date('1963-11-22T00:00:00.000Z');
            var data = '{ "date": "1963-11-22T00:00:00.000Z" }';
            var parsed = parseJson_2.parseJson(undefined, undefined, data, undefined);
            expect(parsed.date.getTime()).toBe(comparisonDate.getTime());
        });
    });
});
define("utils/toCamelCase.spec", ["require", "exports", "utils/toCamelCase"], function (require, exports, toCamelCase_2) {
    "use strict";
    describe('toCamelCase', function () {
        var strings = [
            "aCamelCaseString",
            "a-dash-case--string",
            "a/folder/and/file.url?with=some&params",
            "A_mixed_snake_CASE_string",
            "$toadLips are really.warmAnd-$$_COZY©2013"
        ];
        it('converts to camelCase', function () {
            var actual, expected;
            expected = ["aCamelCaseString", "aDashCaseString", "aFolderAndFileUrlWithSomeParams", "aMixedSnakeCASEString", "toadLipsAreReallyWarmAndCOZY2013"];
            actual = strings.map(function (x) {
                return toCamelCase_2.toCamelCase(x);
            });
            return expect(actual).toEqual(expected);
        });
    });
});
define("utils/toSnakeCase", ["require", "exports", "utils/tokenize"], function (require, exports, tokenize_3) {
    "use strict";
    function toSnakeCase(string) {
        if (string) {
            return tokenize_3.tokenize(string).replace(/[ ]/g, '_').toLowerCase();
        }
    }
    exports.toSnakeCase = toSnakeCase;
});
define("utils/tokenize.spec", ["require", "exports", "utils/tokenize"], function (require, exports, tokenize_4) {
    "use strict";
    describe('Tokenize', function () {
        var strings = [
            "aCamelCaseString",
            "a-dash-case--string",
            "a/folder/and/file.url?with=some&params",
            "A_mixed_snake_CASE_string",
            "$toadLips are really.warmAnd-$$_COZY©2013"
        ];
        //[ ' a Camel Case String ', ' a dash case string ', ' a folder and file url with some params ', ' A mixed snake CASE string ', ' toad Lips are really warm And COZY 2013 ' ] //[ 'a Camel Case String', 'a dash case string', 'a folder and file url with some params', 'A mixed snake CASE string', 'toad Lips are really warm And COZY 2013' ]
        it('tokenizes a string', function () {
            var actual, expected;
            expected = ["a Camel Case String", "a dash case string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And COZY 2013"];
            actual = strings.map(function (x) {
                return tokenize_4.tokenize(x);
            });
            return expect(actual).toEqual(expected);
        });
        it('tokenizes a string with an optional ignore pattern', function () {
            var actual, expected;
            expected = ["a Camel Case String", "a-dash-case--string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And- COZY 2013"];
            actual = strings.map(function (x) {
                return tokenize_4.tokenize(x, "-");
            });
            return expect(actual).toEqual(expected);
        });
    });
});
define("utils/transform.spec", ["require", "exports", "utils/transform"], function (require, exports, transform_3) {
    "use strict";
    describe('transform', function () {
        it('transforms a nested object', function () {
            var data = {
                foo: {
                    bar: 'fizz'
                }
            };
            var callback = function (key, value) {
                if (key === 'bar' && value === 'fizz') {
                    return 'buzz';
                }
                return value;
            };
            var transformed = transform_3.transform(data, callback);
            expect(transformed.foo.bar).toBe('buzz');
        });
    });
});
