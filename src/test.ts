// this file is only being used by karma
// require('phantomjs-polyfill');

require('angular');
require('angular-mocks');
require('./angular');

requireAll((<any>require).context("./", true, /spec.ts$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}