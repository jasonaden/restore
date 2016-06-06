"use strict";
var joinUrl_1 = require('./joinUrl');
describe('joinUrl', function () {
    var baseUrl = '/base-url';
    it('does not join with a slash if the URL begins with a special character', function () {
        var url = '.json';
        var joined = joinUrl_1.joinUrl(url, baseUrl, undefined);
        expect(joined).toEqual('/base-url.json');
    });
    it('joins a URL', function () {
        var url = 'resources/';
        var joined = joinUrl_1.joinUrl(url, baseUrl, undefined);
        expect(joined).toEqual('/base-url/resources');
    });
    it('allows the trailing slash to be preserved', function () {
        var url = 'resources/';
        var removeTrailingSlash = false;
        var joined = joinUrl_1.joinUrl(url, baseUrl, removeTrailingSlash);
        expect(joined).toEqual('/base-url/resources/');
    });
});
