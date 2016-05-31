// Load vendor files
import "babel-core/register";
import "babel-polyfill";
import "angular";
import "ng-redux";
import "redux-saga";
import "redux-logger";
import "redux-immutable";
import "immutable";

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('app', [
  'ngRedux'
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});