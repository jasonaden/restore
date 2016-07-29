import {$httpPersistor} from './$http-persistor';
import { $httpPersistorConfig} from './$http-persistor-config';
import { caseEmbedded } from '../mocks/caseEmbedded';

fdescribe('$httpPersistor', () => {
  let $httpBackend: ng.IHttpBackendService;
  let $rootScope: ng.IRootScopeService;
  let ConfigClass = $httpPersistorConfig;
  let config: $httpPersistorConfig;
  
  let PersistorClass = $httpPersistor;
  let persistor: $httpPersistor;

  let $q: ng.IQService;
  let prom: ng.IPromise<any>;

  beforeEach(angular.mock.module('Restore'));
  
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$httpPersistor_, _$q_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $q = _$q_;

    persistor = new _$httpPersistor_();
    config = new $httpPersistorConfig();
    
  }));

  describe('should have static methods', () => {
    it('to set config', () => {
      expect(typeof PersistorClass.setConfig).toEqual('function')
    })

    it('to get the config', () => {
      expect(typeof PersistorClass.getConfig).toEqual('function')
    })

    it('to set a default config', () => {
      expect(PersistorClass.getConfig()).toEqual(config)
      expect(PersistorClass.getConfig().method).toEqual('GET')
    })

    // $http and $q properties are marked private for the TS compiler
    // but are available so we can verify they exist
    it('to set the $http service', () => {
      expect(typeof PersistorClass.setHttp).toEqual('function')
      expect(typeof PersistorClass.$http).toEqual('function')
    })

    it('to set the $q service', () => {
      expect(typeof PersistorClass.setQ).toEqual('function')
      expect(typeof PersistorClass.$q).toEqual('function')
    })

  })

  describe('should have instance methods: ', () => {
    let methods = ['setConfig','execute','doRequest'];
    it(methods.join(','), () => {
      methods.forEach( (item) => {
        expect( typeof persistor[item] ).toEqual('function')
      })
    } )
  })

  describe('should be able to override the default configuration', () => {
    it('in the constructor', () => {
      // make a new config
      let newConfig = new $httpPersistorConfig();
      newConfig.method = 'PUT';

      // verify the default persistor has the default config
      expect( persistor.getConfig().method ).toEqual('GET');

      let newPersistor = new $httpPersistor(newConfig); 
      expect( newPersistor.getConfig().method ).toEqual('PUT');
    })

    it('by calling setConfig', () => {
      // verify default persistor has the default config
      expect( persistor.getConfig().method ).toEqual('GET');

      persistor.setConfig( {method: "PATCH"});
      expect( persistor.getConfig().method ).toEqual('PATCH');
    })

    // Can also override the config when calling persistor.execute -- 
    //  see tests below where that is done.

  })

  describe('execute method', () => {
    beforeEach(() => {
      persistor.setConfig({
        url: '/foo/{{@id}}'
      });
      prom = $q.when(1);
    });

    it('should return a promise', () => {
      let localConfig = {
        data: {id: 13}
      };      
      $httpBackend.expectGET('/foo/13').respond(200, {me: 'too'});

      let ret = persistor.execute(localConfig);

      // a little hokey in terms of getting the Promise to verify the 
      //  type, hopefully will come across a better way to do it.  
      expect( ret instanceof prom.constructor  ).toBeTruthy()
    })

    it('should return data for a case as it was received from the server', (done) => {
      let localConfig = {
        data: {id: 13}
      };      
      $httpBackend.expectGET('/foo/13').respond(200, caseEmbedded);
      persistor.execute(localConfig)
      .then( (response) => {
        expect(response.data).toEqual(caseEmbedded)
        done(); 
      })
      $httpBackend.flush();
    })
    
    it('should return an array of data as it was received from the server', (done) => {
      let localConfig = {
        data: {id: 13}
      };      
      $httpBackend.expectGET('/foo/13').respond(200, caseEmbedded);
      persistor.execute(localConfig)
      .then( (response) => {
        expect(response.data).toEqual(caseEmbedded)
        done(); 
      })
      $httpBackend.flush();
    })

  })


  describe('makes GET requests', () => {
    beforeEach(() => {
      persistor.setConfig({
        url: '/foo/{{@id}}'
      });
    });
    
    it('it should use the default GET method', () => {
      $httpBackend.expectGET('/foo').respond(200);
      persistor.execute();
      $httpBackend.flush();
    });
    
    it('should support dynamic URLs', () => {
      let localConfig = {data: { id: 1 }};
      $httpBackend.expectGET('/foo/1').respond(200);    
      persistor.execute(localConfig);  
      $httpBackend.flush();
    });
    
    it('should add params to the query string', () => {
      let localConfig = {
        data: {id: 1},
        params: {order: 'desc'}
      };      
      $httpBackend.expectGET('/foo/1?order=desc').respond(200);    
      persistor.execute(localConfig);  
      $httpBackend.flush();
    });

  }); // makes GET requests

  describe('makes POST requests', () => {
    let localConfig;
    beforeEach(() => {
      persistor.setConfig( {
        url: '/foo/{{@id}}',
        method: 'POST',
        data: { name: 'Mr. Bean'}
      })
    });
    
    it('POSTs the data in data property', () => {
      $httpBackend.expectPOST('/foo', {name: 'Mr. Bean'}).respond(201);
      persistor.execute();  
      $httpBackend.flush();
    });
    
    it('drops ID param on POST even if it exists in data prop', () => {
      let localConfig = {data: {id: 1}};
      
      $httpBackend.expectPOST('/foo').respond(201);    
      persistor.execute(localConfig);  
      $httpBackend.flush();
    });
    
    it('adds params to query string', () => {
      let localConfig = {params: {order: 'desc'}};

      $httpBackend.expectPOST('/foo?order=desc').respond(201);    
      persistor.execute(localConfig); 
      $httpBackend.flush();
    });
    
  }); // makes POST requests
  
  describe('makes PUT & PATCH requests', () => {
    beforeEach(() => {
      persistor.setConfig( {
        url: '/foo/{{@id}}',
        method: 'PUT',
        data: {
          id: 101,
          subject: "Updated Item"
        }        
      })
    });
    
    it('PUTs & PATCHes the data in data property', () => {
      // PUT
      $httpBackend.expectPUT('/foo/101').respond(200);
      persistor.execute();
      $httpBackend.flush();
      // PATCH
      $httpBackend.expectPATCH('/foo/101').respond(200); 
      // reset method in execute
      persistor.execute({method: 'PATCH'});
      $httpBackend.flush();
    });
    
    it('adds params to query string', () => {
      let localConfig = {
        params: {order: 'desc'}
      };
      // PUT
      $httpBackend.expectPUT('/foo/101?order=desc').respond(200);    
      persistor.execute(localConfig);  
      $httpBackend.flush();
      // PATCH
      $httpBackend.expectPATCH('/foo/101?order=desc').respond(200);
      localConfig.method = 'PATCH'       
      persistor.execute(localConfig);  
      $httpBackend.flush();
    });
    
  }); // makes PUT requests
    
  describe('performs transformations', () => {

    it('on a response', () => {
      persistor.setConfig( {
        url: '/foo/bar',
        method: 'GET', 
        transformResponse: (response) => {
          response.name = 'Mr. ' + response.name;
          return response;
        }
      })

      $httpBackend.whenGET(config.url).respond(200, { name: 'Smith'});    
      persistor.execute().then( (response) => {
        expect(response.data.name).toBe('Mr. Smith');
      });     
      $httpBackend.flush(); 
    });   
      
    it('on  a request', () => {
      persistor.setConfig( {
        url: '/foo/bar',
        method: 'POST', 
        data: { name: 'Jones'},
        transformRequest: (request) => {
          request.name = 'Mr. ' + request.name;
          request.foo = 'bar';
          return request;
        }        
      })

      $httpBackend.expectPOST(config.url, { name: 'Mr. Jones', foo: 'bar' }).respond(200);
      persistor.execute();  
      $httpBackend.flush();
    });    
  });// performs transformations
  
  // 7/28/16: daden: not running this because interceptors not currently 
  //  implemented. See notes in generate-http-config.ts
  xdescribe('allows custom interceptors', () => {
    beforeEach( () => {
      persistor.setConfig( {
        method: 'GET',
        url: '/foo/bar'
      });
    });
    
    it('allows custom interceptors for a response', () => {
      let response = null;
      config = config.extend({
        interceptors: {
          response: (response) => {
            console.log("doing the response", response)
            response.data.name = 'Mr. ' + response.data.name;
            return response;
          }
        }
      });
       
      $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
      persistor.execute().then((res) => {
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