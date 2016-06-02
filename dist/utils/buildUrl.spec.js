"use strict";
var buildUrl_1 = require('./buildUrl');
describe('buildUrl', function () {
    it('returns a basic URL', function () {
        var config = {
            url: '/thing',
            method: 'POST'
        };
        var url = buildUrl_1.buildUrl(config);
        expect(url).toBe(config.url);
    });
    it('returns empty string if there is no config.url', function () {
        var config = {
            url: undefined,
            method: 'POST'
        };
        var url = buildUrl_1.buildUrl(config);
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
        var url = buildUrl_1.buildUrl(config, source);
        var url2 = buildUrl_1.buildUrl(config2, source2);
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
        var url = buildUrl_1.buildUrl(config, source);
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
        var url = buildUrl_1.buildUrl(config, source);
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
        var url = buildUrl_1.buildUrl(config, source);
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
        var url = buildUrl_1.buildUrl(config, source);
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
        var url = buildUrl_1.buildUrl(config, source, { id: "longThingId" });
        expect(url).toBe('/thing/2');
    });
});
