
import {Store, Reducer, combineReducers} from 'redux';
import {BaseAdapter} from './base-adapter';
import {BasePersistor} from '../persistors/base-persistor';
import {$httpPersistor} from '../persistors/$http-persistor';
import {appSchema} from '../mocks/schemas';

import {IPersistor} from '../persistors/i-persistor';

import {caseEmbedded} from '../mocks/caseEmbedded';
import {changesCase} from '../mocks/changesCase';

import configureStore = require('redux-mock-store');

import {
  IPersistorConfig,
  IAdapterConfig} from '../resources/interfaces';

describe('BaseAdapter', () => {
  
  let $q: ng.IQService;
  let prom: ng.IPromise<any>;
  
  interface MockStore extends Store {
    getState():any;
    getActions():Array<any>;
    dispatch(action:any):any;
    clearActions():void;
    subscribe():any;
  }
   
  let mockStore: MockStore;

  
  beforeEach(inject(function(_$q_) {
    $q = _$q_;
    mockStore = configureStore()({});
  }));

  let testPersistor: IPersistor = {
      create: (data, params?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, params?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (persistorConfig: IPersistorConfig) => Promise.all([caseEmbedded]),
      find: (params) => Promise.all( [changesCase] ),
      destroy: (params) => Promise.resolve(null)
    }

  class TestAdapter extends BaseAdapter {
    persistence = testPersistor;
  }

  // basic instantiation
  describe('should set', () => {
    let adapter;
    beforeEach( () => {
      adapter = new BaseAdapter();
    })

    it('default persistor', () => {
      expect(adapter.persistor instanceof BasePersistor).toBe(true);
    });
    it('passed-in persistor', () => {
      let adapter = new BaseAdapter(null, null, testPersistor);
      expect(adapter.persistor).toBe(testPersistor);
    });

    it('an empty schema if none provided', () => {
      expect(adapter.schema).toEqual({})
    })
    it('the passed-in schema', () => {
      adapter = new BaseAdapter(appSchema);
      expect(adapter.schema).toEqual(appSchema);
    })

    it('basic methods', () => {
      // TODO fill out the list when finalized
      let methods = ['findOne', 'find'];
      methods.forEach( (item) => {
        expect( typeof adapter[item] ).toEqual('function');
      })
    })

  })

  describe('should use a promise chain', () => {
    let adapter; 
    beforeEach( () => {

      adapter = new BaseAdapter(null, null, testPersistor); 

      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter.persistor, "findOne").and.callFake( 
        (persistorConfig) => {
          return Promise.resolve( {data: {id: 567}} );
        });
      spyOn(adapter, 'afterFindOne').and.callThrough();
    })

    it('when invoking findOne', (done) => {
      adapter.findOne({id: 123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123}, undefined);
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( {id: 567}, undefined)
        done();
      }, (err) => {
        expect("ERROR OCCURED: ").toEqual(err);
        done();
      })    
    })
  })

  // TODO: These test for rejected promises. Probably need to 
  //  add tests for methods that just throw errors.
  describe('should handle errors anywhere on the chain', () => {
    let adapter;

    it('should catch rejections from the beforeFindOne', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'beforeFindOne').and.callFake( 
        () => { 
          return [Promise.reject("in beforeFindOne")]
        }
      );

      adapter.findOne({id:123})
      .then( () => {
        expect('this success beforeFindOne test should not be running').toEqual('foo')
        done();
      }, (err) => {
        expect(err).toEqual('in beforeFindOne')
        done();
      })      
    })

    it('should catch rejections from the call to the persistor', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter.persistor, "findOne").and.callFake( 
        () => { 
          return Promise.reject("in persistorFindOne")
        }
      );

      adapter.findOne({id:123})
      .then( () => {
        expect('this success persistor.findOne test should not be runnning').toEqual('foo')
        done();
      }, (err) => {
        expect(err).toEqual('in persistorFindOne')
        done();
      })
    })

    it('should catch rejections from the afterFindOne', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'afterFindOne').and.callFake( 
        () => { 
          return Promise.reject("in afterFindOne")
        }
      );

      adapter.findOne({id:123})
      .then( () => {
        expect('this success afterFindOne test should not be running').toEqual('foo')
        done();
      }, (err) => {
        expect(err).toEqual('in afterFindOne')
        done();
      })      
    })

  })

  // TODO: Move this to a test for the ApiV2 Adapter in POC
  // Split schema is in the ApiV2 Adapter, not the base
  xdescribe('splitSchema', () => {

    let adapter;
    let types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE']
    beforeEach( () => {

      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'splitSchema').and.callThrough();
    }) 
 
    it('should be called when a schema is provided', (done) => {
      adapter.findOne({id:123})
      .then( () => {
        expect(adapter.splitSchema).toHaveBeenCalledWith( caseEmbedded )
        done();
      })
    })

    it('should dispatch events for each of the types of data returned', (done) => {
      adapter.findOne( {id:123} )
      .then( () => {
        mockStore.getActions().map( (item) => {
          // verify that we dispatched events for all the individual resources
          expect( types.indexOf( item.type.split("_")[1] ) > -1).toBeTruthy();
        })
        done();
      })
    })
  })


});