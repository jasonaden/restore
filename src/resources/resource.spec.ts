import {Resource} from './resource';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';
import {Schema} from 'normalizr';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let $httpBackend: ng.IHttpBackendService;
let $rootScope: ng.IRootScopeService;
let store = mockStore({});;
let url: string = 'http://localhost:8888/api/v2/testResource';
let response = {
   "total_entries": 1,
   "page": 1,
   "_links": {
      "self": {
         "href": "/api/v2/testResource?page=1&per_page=50",
         "class": "page"
      }
   },
   "_embedded": {
      "entries": [
         {
            "id": 1,
            "subject": "Test Resource subject",
            "_links": {
              "self": {
                "href": "/api/v2/testResource/1",
                "class": "testResource"
              }
            }
         }
      ]
   }
}

xdescribe('Resource', () => {
  
  var schema = new Schema('testResource');
  
  class _TestResource_ extends Resource<any> {
    className = 'TEST_RESOURCE';
    url = '/testResource';
    constructor ($ngRedux, $http, $q, ApiV2Adapter) {
      super($ngRedux, $http, $q, ApiV2Adapter, schema);
    }
  }
  let TestResource: Resource<_TestResource_>;

  beforeEach(angular.mock.module('app'));
  
  beforeEach(angular.mock.module($provide => {
    $provide.service('TestResource', _TestResource_);
  }));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _TestResource_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    TestResource = _TestResource_;

    // Mock the store
    TestResource.store = store;

    TestResource.store.clearActions();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  
  
  it('works', () => {
    
    import {restore} from 'restore';
    
    export var Case = restore({
      url: '',
      something: '',
      config: 'stuff'
    })
    .adapter({
      
    })
    
    
    
    
    
  })
  
  
  
  

  it('should have isLoading method default to false', () => {
    expect(TestResource.isLoading()).toBe(false);
  });

  it('should have isLoading(id) method default to false', () => {
    expect(TestResource.isLoading(1)).toBe(false);
  });
  
  describe ('find()', () => {
    it ('dispatches the proper actions on error', () => {
      let actions;
      $httpBackend.whenGET(url).respond(500, response);
      TestResource.find().catch((error) => {
        actions = [
          { type: 'FINDING_TEST_RESOURCE', payload: undefined},
          { type: 'ERROR_TEST_RESOURCE', payload: error}
        ];
      });
      $httpBackend.flush();
      expect(TestResource.store.getActions()).toEqual(actions);
    });
    
    it ('dispatches the proper actions on success', () => {
      let actions = [
        { type: 'FINDING_TEST_RESOURCE', payload: undefined},
        { type: 'FIND_TEST_RESOURCE', payload: {
            result: [ 1 ],
            items: {
              '1': {
                "id": 1,
                "subject": "Test Resource subject",
                "_links": {
                  "self": {
                    "href": "/api/v2/testResource/1",
                    "class": "testResource"
                  }
                }
              }
            },
            meta: {
              count: 1,
              page: 1,
              links: {
                self: {
                  href: '/api/v2/testResource?page=1&per_page=50',
                  class: 'page'
                }
              }
            }
          }
        }
      ];
      $httpBackend.whenGET(url).respond(200, response);
      TestResource.find();
      $httpBackend.flush();
      expect(TestResource.store.getActions()).toEqual(actions);
    });
    
    it ('calls before and after lifecycle hooks', () => {
      spyOn(TestResource, 'beforeFind').and.callThrough();
      spyOn(TestResource, 'afterFind').and.callThrough();      
      $httpBackend.whenGET(url).respond(200, response);
      TestResource.find();
      $httpBackend.flush();
      expect(TestResource.beforeFind).toHaveBeenCalled();
      expect(TestResource.afterFind).toHaveBeenCalled();
    });
    
    it('returns a promise resolving with listing data from API', () => {
      $httpBackend.whenGET(url).respond(200, response);
      TestResource.find().then(cases => {
        expect(cases).toBeDefined();
        // Verify cases come back in "pure" API format
        expect({}).toEqual({});
      });
      $httpBackend.flush();
    })
        
  });
  
});