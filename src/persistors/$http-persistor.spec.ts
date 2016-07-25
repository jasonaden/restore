import {$httpPersistor} from './$http-persistor';
import * as angular from 'angular';



fdescribe('$httpPersistor', () => {
  let $httpBackend: ng.IHttpBackendService;
  let $rootScope: ng.IRootScopeService;
  let config, persistor: $httpPersistor;

  beforeEach(angular.mock.module('Restore'));
  
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$httpPersistor_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    persistor = new _$httpPersistor_();
    
  }));

  describe('makes GET requests', () => {
    beforeEach(() => {
      persistor.setConfig({
        url: '/foo/{{@id}}',
        method: 'GET'
      });
    });
    
    fit('to listing URLs', () => {
      $httpBackend.expectGET('/foo').respond(200);    
      persistor.execute(config);
      $httpBackend.flush();
    });
    
    it('to item URLs', () => {
      
      config = config.extend({data: {
        id: 1
      }});
      
      $httpBackend.expectGET('/foo/1').respond(200);    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
    it('adds params to query string', () => {
      config = config.extend({
        data: {id: 1},
        params: {order: 'desc'}
      });
      
      $httpBackend.expectGET('/foo/1?order=desc').respond(200);    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
  }); // makes GET requests

  xdescribe('makes POST requests', () => {
    beforeEach(() => {
      config = config.extend({
        url: '/foo/{{@id}}',
        method: 'POST',
        data: {
          subject: "New Item"
        }
      });
    });
    
    it('POSTs the data in data property', () => {
      $httpBackend.expectPOST('/foo').respond(201);    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
    it('drops ID param on POST even if it exists in data prop', () => {
      
      config = config.extend({
        data: {
          id: 1,
          subject: "New Item"
        }
      });
      
      $httpBackend.expectPOST('/foo').respond(201);    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
    it('adds params to query string', () => {
      config = config.extend({
        params: {order: 'desc'}
      });
      
      $httpBackend.expectPOST('/foo?order=desc').respond(201);    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
  }); // makes POST requests
  
  xdescribe('makes PUT & PATCH requests', () => {
    beforeEach(() => {
      config = config.extend({
        url: '/foo/{{@id}}',
        method: 'PUT',
        data: {
          id: 101,
          subject: "Updated Item"
        }
      });
    });
    
    it('PUTs & PATCHes the data in data property', () => {
      // PUT
      $httpBackend.expectPUT('/foo/101').respond(200);
      persistor.execute(config);
      $httpBackend.flush();
      // PATCH
      $httpBackend.expectPATCH('/foo/101').respond(200);
      config = config.extend({method: 'PATCH'})  
      persistor.execute(config);
      $httpBackend.flush();
    });
    
    it('adds params to query string', () => {
      config = config.extend({
        params: {order: 'desc'}
      });
      // PUT
      $httpBackend.expectPUT('/foo/101?order=desc').respond(200);    
      persistor.execute(config);  
      $httpBackend.flush();
      // PATCH
      $httpBackend.expectPATCH('/foo/101?order=desc').respond(200);
      config = config.extend({method: 'PATCH'})    
      persistor.execute(config);  
      $httpBackend.flush();
    });
    
  }); // makes PUT requests
    
    
  xdescribe('performs transformations', () => {
    
    beforeEach(() => {
      config = config.extend({
        method: 'GET',
        url: '/foo/bar'
      });
    });
    
    it('on a response', () => {
      config = config.extend({
        transformResponse: (response) => {
          response.name = 'Mr. ' + response.name;
          return response;
        }
      });           
      $httpBackend.whenGET(config.url).respond(200, { name: 'Smith'});    
      persistor.execute(config).then((response) => {
        expect(response.data.name).toBe('Mr. Smith');
      });     
      $httpBackend.flush(); 
    });   
      
    it('on  a request', () => {
      config = config.extend({
        method: 'POST',
        data: { name: 'Smith' },
        transformRequest: (request) => {
          let data = JSON.parse(request);
          data.name = 'Mr. ' + data.name;
          return data;
        }
      });
      $httpBackend.expectPOST(config.url, { name: 'Mr. Smith'}).respond(200);
      persistor.execute(config);  
      $httpBackend.flush();
    });    
  });// performs transformations
  
  xdescribe('allows custom interceptors', () => {
    beforeEach(() => {
      config = config.extend({
        method: 'GET',
        url: '/foo/bar'
      });
    });
    
    it('allows custom interceptors for a response', () => {
      let response = null;
      config = config.extend({
        interceptors: {
          response: (cfg) => {
            cfg.data.name = 'Mr. ' + cfg.data.name;
            return cfg;
          }
        }
      });
       
      $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
      persistor.execute(config).then((res) => {
        response = res.data;
      });
      $httpBackend.flush();
      expect(response).toEqual({ name: 'Mr. Smith' }); 
    });  
          
    it('allows custom interceptors for a response error', () => {
      let error = null;
      let errorResponse = 'Error!'
      config = config.extend({
        interceptors: {
          responseError: (rejection) => {
            rejection.data = errorResponse;
            return $q.reject(rejection);
          }
        }
      });
       
      $httpBackend.whenGET(config.url).respond(500);
      persistor.execute(config).catch((err) => {
        error = err.data;
      });
      $httpBackend.flush();
      expect(error).toEqual(errorResponse); 
    });  
  }); // allows custom interceptors
  
});