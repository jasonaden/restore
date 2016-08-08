// this file is only being used by karma
// require('phantomjs-polyfill');
require('angular');
require('angular-mocks');
require('./angular');
requireAll(require.context("./", true, /spec.ts$/));
function requireAll(r) {
    r.keys().forEach(r);
}
