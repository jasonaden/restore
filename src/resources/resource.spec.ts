import {Resource} from './resource';
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
  
  class TestResource extends Resource {
    className = 'TEST_RESOURCE';
  }
  let testResource: Resource;

  
  beforeEach(() => {
    let store = mockStore({});
    // testResource = new TestResource(store, adapter, schema);
    testResource = new TestResource(store, adapter);
  });
  
});