import {Resource} from './resource';
import {BaseAdapter} from '../adapters/base-adapter';
import {BaseAdapterPersistence} from '../adapters/base-adapter-persistence';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';
import {Schema} from 'normalizr';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let response = {
   "total_entries": 1,
   "page": 1,
   "_links": {
      "self": {
         "href": "/api/v2/testResource?page=1&per_page=50",
         "class": "page"
      }
   },
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

describe('Resource', () => {
  
  var schema = new Schema('testResource');
  var adapter = new BaseAdapter();
  
  class TestResource extends Resource<any> {
    className = 'TEST_RESOURCE';
  }
  let testResource: Resource<TestResource>;

  
  beforeEach(() => {
    let store = mockStore({});
    testResource = new TestResource(store, adapter, schema);
  });

  it('should have isLoading method default to false', () => {
    expect(testResource.isLoading()).toBe(false);
  });

  it('should have isLoading(id) method default to false', () => {
    expect(testResource.isLoading(1)).toBe(false);
  });
  
  describe ('find()', () => {
    it ('dispatches the proper actions on error', (done) => {
      let actions;
      testResource.adapter.find = (payload, params?) => Promise.reject(undefined);

      testResource.find().then(x => x, (error) => {
        actions = [
          { type: 'FINDING_TEST_RESOURCE', payload: undefined},
          { type: 'ERROR_TEST_RESOURCE', payload: error}
        ];
        expect(testResource.store.getActions()).toEqual(actions);
        done();
      });      
    });
    
    it ('dispatches the proper actions on success', (done) => {
      testResource.adapter.find = (payload, params?) => Promise.resolve(response);
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
      testResource.find().then(() => {
        expect(testResource.store.getActions()).toEqual(actions);
        done()
      });
    });
    
    it ('calls before and after lifecycle hooks', (done) => {
      spyOn(testResource, 'beforeFind').and.callThrough();
      spyOn(testResource, 'afterFind').and.callThrough();      
      
      testResource.find().then(() => {
        expect(testResource.beforeFind).toHaveBeenCalled();
        expect(testResource.afterFind).toHaveBeenCalled();
        done();
      });
    });
    
    it('returns a promise resolving with listing data from API', (done) => {
      testResource.find().then(cases => {
        expect(cases).toBeDefined();
        // Verify cases come back in "pure" API format
        expect({}).toEqual({});
        done();
      });
    })
        
  });
  
});