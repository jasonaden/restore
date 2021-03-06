// TODO: Work out what to do with this file. It's probably got to be pushed down to 
// the persistence layer. It's Angularized, but doesn't really need to be (I don't think)

import {BaseAdapter} from '../adapters/base-adapter';
import {generateConfig} from '../utils';
import {IResourceAdapter, IResourceRequestConfig} from '../resources/interfaces';
import {Schema} from 'normalizr';

var $http: ng.IHttpService;
var $q: ng.IQService;
var adapter: IResourceAdapter;
var config: IResourceRequestConfig;
var $rootScope: ng.IRootScopeService;

describe('generateConfig', () => {  
  beforeEach(inject(function(_$http_, _$httpBackend_, _$q_, _$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    let schema = new Schema('testResource');
    let adapter = new BaseAdapter();
    config = {
      method: 'GET',
      url: '/foo/bar'      
    };  
  }));
    
  it ('is defined', () => {
     expect(generateConfig).toBeDefined();
  });
  
  it ('returns a promise', () => {
    let request = generateConfig($q, adapter, config);
    expect(request.then).toBeDefined(); 
  });  
  
  it ('adds default transforms', () => {
    generateConfig($q, adapter, config).then((config) => {
      expect(config.transformResponse).toBeDefined();
      expect(config.transformRequest).toBeDefined();      
    });
    $rootScope.$digest();
  });  
  
  it ('sets up default interceptors', () => {
    generateConfig($q, adapter, config).then((config) => {
      expect(config.interceptor.response).toBeDefined();
      expect(config.interceptor.responseError).toBeDefined();  
    });
    $rootScope.$digest();
  });    
});