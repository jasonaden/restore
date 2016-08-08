import {Resource} from './resource';
import {ResourceList} from './resource-list';
import {BaseAdapter} from '../adapters/base-adapter';
import {BasePersistor} from '../persistors/base-persistor';
import configureStore = require('redux-mock-store')
import * as thunk from 'redux-thunk';
import {Schema} from 'normalizr';

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

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
  class TestResourceList extends ResourceList<any> {
    listKey = 'TEST_RESOURCE_LIST';
  }
  let testResourceList: ResourceList<any>;

  
  beforeEach(() => {
    let store = mockStore({});
    testResource = new TestResource(store, adapter, schema);
    testResourceList = new TestResourceList('testResourceList', testResource, adapter);
  });

  it('should have isLoading method default to false', () => {
    expect(testResourceList.isLoading()).toBe(false);
  });

  describe ('find()', () => {
    xit ('dispatches the proper actions on error', (done) => {
      let actions;
      testResourceList.find = (payload, params?) => Promise.reject(undefined);

      testResourceList.find().then(x => x, (error) => {
        actions = [
          { type: 'FINDING_TEST_RESOURCE', payload: undefined},
          { type: 'ERROR_TEST_RESOURCE', payload: error}
        ];
        expect(testResource.store.getActions()).toEqual(actions);
        done();
      });      
    });
    
    xit ('dispatches the proper actions on success', (done) => {
      testResourceList.find = (payload, params?) => Promise.resolve(response);
      let actions = [
        { type: 'FINDING_TEST_RESOURCE', payload: undefined},
        { type: 'FOUND_TEST_RESOURCE', payload: undefined}
      ];
      testResourceList.find().then(() => {
        expect(testResource.store.getActions()).toEqual(actions);
        done()
      });
    });
    
    it ('calls before and after lifecycle hooks', (done) => {
      spyOn(testResourceList, 'beforeFind').and.callThrough();
      spyOn(testResourceList, 'afterFind').and.callThrough();      
      
      testResourceList.find().then(() => {
        expect(testResourceList.beforeFind).toHaveBeenCalled();
        expect(testResourceList.afterFind).toHaveBeenCalled();
        done();
      });
    });
    
    it('returns a promise resolving with listing data from API', (done) => {
      testResourceList.find().then(cases => {
        expect(cases).toBeDefined();
        // Verify cases come back in "pure" API format
        expect({}).toEqual({});
        done();
      });
    })
        
  });
  
});
