import {Resource} from './resource';
import {uiResource} from './uiResource';
// import {BaseAdapter} from '../adapters/base-adapter';
// import {BasePersistor} from '../persistors/base-persistor';
import configureStore = require('redux-mock-store')
// import * as thunk from 'redux-thunk';
// import {Schema} from 'normalizr';

// const middlewares = [ thunk ]
const mockStore = configureStore()

describe('uiResource', () => {

  class TestUiResource extends uiResource {
    className = 'TEST_RESOURCE';
  }
  let testUiResource: uiResource;
  let uiResourceMethods = ['get','populate'];

  
  beforeEach(() => {
    // let store = mockStore({});
    // testResource = new TestResource(store, adapter, schema);
    testUiResource = new TestUiResource(mockStore);
  });

  describe('testUiResource', () => {
    it('should be an instance of uiResource', () => {
      expect( testUiResource instanceof uiResource ).toBeTruthy();
    })

    it('should have a standard set of methods', () => {
      uiResourceMethods.forEach( (item) => {
        expect( typeof testUiResource[item] ).toEqual('function')
      })
    })

  })

  


  
});