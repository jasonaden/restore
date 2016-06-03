import { buildUrl } from './buildUrl';
describe('buildUrl', () => {
    it('returns a basic URL', () => {
        let config = {
            url: '/thing',
            method: 'POST'
        };
        let url = buildUrl(config);
        expect(url).toBe(config.url);
    });
    it('returns empty string if there is no config.url', () => {
        let config = {
            url: undefined,
            method: 'POST'
        };
        let url = buildUrl(config);
        expect(url).toBe('');
    });
    it('drops ID param on POST', () => {
        let config = {
            url: '/thing/{{@id}}',
            method: 'POST'
        };
        let config2 = {
            url: '/thing/{{@thingId}}/thang/{{@id}}',
            method: 'POST'
        };
        let source = {};
        let source2 = {
            id: 1,
            thingId: 2
        };
        let url = buildUrl(config, source);
        let url2 = buildUrl(config2, source2);
        expect(url).toBe('/thing');
        expect(url2).toBe('/thing/2/thang');
    });
    it('replaces ID param on PUT', () => {
        let config = {
            url: '/thing/{{@id}}',
            method: 'PUT'
        };
        let source = {
            id: 11
        };
        let url = buildUrl(config, source);
        expect(url).toBe('/thing/11');
    });
    it('replaces @param values from source', () => {
        let config = {
            url: '/thing/{{@thingId}}/thang/{{@id}}',
            method: 'GET'
        };
        let source = {
            id: 1,
            thingId: 2
        };
        let url = buildUrl(config, source);
        expect(url).toBe('/thing/2/thang/1');
    });
    it('replaces @thing.param values from source', () => {
        let config = {
            url: '/thing/{{@thang.id}}',
            method: 'GET'
        };
        let source = {
            thang: {
                id: 2
            }
        };
        let url = buildUrl(config, source);
        expect(url).toBe('/thing/2');
    });
    it('replaces `{{something}}` from config.params and removes from config.params', () => {
        let config = {
            url: '/thing/{{@id}}?filter={{filter}}',
            method: 'GET',
            params: {
                filter: 'priority'
            }
        };
        let source = {
            id: 2
        };
        let url = buildUrl(config, source);
        expect(url).toBe('/thing/2?filter=priority');
    });
    it('maps object keys using the map param', () => {
        let config = {
            url: '/thing/{{@id}}',
            method: 'GET'
        };
        let source = {
            longThingId: 2
        };
        let url = buildUrl(config, source, { id: "longThingId" });
        expect(url).toBe('/thing/2');
    });
});
