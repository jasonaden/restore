// TODO: This file should probably be renamed. Maybe like "angular-exporter" or 
// something like that. The idea is it's a file that can be used to wire in 
// various pieces of this library to Angular.

import {$httpPersistor} from './persistors/$http-persistor';
import * as angular from 'angular';


export let RestoreModule = angular.module('Restore', [])
.provider('$httpPersistor', () => {
  return {
    $get: ($http, $q) => {
      $httpPersistor.setHttp($http);
      $httpPersistor.setQ($q);
      return $httpPersistor;
    }
  };
})
// .service('$httpPersistor', $httpPersistor);

export let Restore = "Restore";
