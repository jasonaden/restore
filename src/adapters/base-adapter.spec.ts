
import {Store, Reducer, combineReducers} from 'redux';
import {BaseAdapter} from './base-adapter';
import {BasePersistor} from '../persistors/base-persistor';
import {$httpPersistor} from '../persistors/$http-persistor';
import {appSchema} from '../mocks/schemas';

import {IPersistor} from '../persistors/i-persistor';

import {caseEmbedded} from '../mocks/caseEmbedded';
import {changesCase} from '../mocks/changesCase';

import configureStore = require('redux-mock-store');

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
      findOne: (params) => Promise.all([caseEmbedded]),
      find: (params) => Promise.all( [changesCase] ),
      destroy: (params) => Promise.resolve(null)
    }

  class TestAdapter extends BaseAdapter {
    persistence = testPersistor;
  }

  // TODO: playground
  describe('developing', () => {

    let adapter;
    let types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE']
    beforeEach( () => {

      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);

      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter.persistor, "findOne").and.callThrough();
      spyOn(adapter, 'afterFindOne').and.callThrough();
      spyOn(adapter, 'splitSchema').and.callThrough();
    }) 


    it('should handle the changes properly', (done) => {
      adapter.findOne({id:123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( caseEmbedded );
        expect(adapter.splitSchema).toHaveBeenCalledWith( caseEmbedded )
        done();
      }, (err) => {
        expect(adapter.splitSchema).toThrow()
        console.log("test error!!!!", err.message);
        done();
      })      
    })
  })


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
      spyOn(adapter.persistor, "findOne").and.callFake( (params) => Promise.all([{id: 567}]) );
      spyOn(adapter, 'afterFindOne').and.callThrough();
    })

    it('when invoking findOne', (done) => {
      adapter.findOne({id: 123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( {id: 567})
        done();
      })    
    })
  })

  describe('splitSchema', () => {

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

  // TODO: These test for rejected promises. Probably need to 
  //  add tests for methods that just throw errors.
  describe('should handle errors anywhere on the chain', () => {
    let adapter;

    it('should catch rejections in beforeFindOne', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'beforeFindOne').and.callFake( () => { return Promise.reject("in beforeFindOne")});

      adapter.findOne({id:123})
      .then( () => {
        expect('this should not run').toBeTruthy
        done();
      }, (err) => {
        expect(err).toEqual('findOne failed in beforeFindOne')
        done();
      })      
    })

    it('should catch rejections in the call to the persistor', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter.persistor, "findOne").and.callFake( () => { return Promise.reject("in persistorFindOne")});

      adapter.findOne({id:123})
      .then( () => {
        expect('this should not run').toBeTruthy
        done();
      }, (err) => {
        expect(err).toEqual('findOne failed in persistorFindOne')
        done();
      })      
    })

    it('should catch rejections in afterFindOne', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'afterFindOne').and.callFake( () => { return Promise.reject("in afterFindOne")});

      adapter.findOne({id:123})
      .then( () => {
        expect('this should not run').toBeTruthy
        done();
      }, (err) => {
        expect(err).toEqual('findOne failed in afterFindOne')
        done();
      })      
    })

    // TODO: because the where the fail method is set on the final findOne() "then", 
    //  this error is just returned and does not go through the 'fail' method.
    it('should catch rejections in splitSchema', (done) => {
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);
      spyOn(adapter, 'splitSchema').and.callFake( () => { return Promise.reject("in splitSchema")});

      adapter.findOne({id:123})
      .then( () => {
        expect('this should not run').toBeTruthy
        done();
      }, (err) => {
        expect(err).toEqual('in splitSchema')
        done();
      })      
    })
  })


  describe('has an add method that', () => {
    let adapter;
    let newObj;
      
    beforeEach(() => {
      newObj = {id: 789};
      adapter = new TestAdapter({});
    });
    
    it('runs before and after methods', (done) => {
      spyOn(adapter, 'beforeAdd').and.callThrough();
      spyOn(adapter, 'afterAdd').and.callThrough();
      adapter.add(newObj)
      .then(createdObj => {
        expect(adapter.beforeAdd).toHaveBeenCalledWith(newObj, undefined);
        expect(adapter.afterAdd).toHaveBeenCalled();
        done();
      });
    });

    it('runs adapter.persistence.create', (done) => {
      adapter.add(newObj).then(createdObj => {
        expect(createdObj.id).toBe(789);
        expect(createdObj.created).toBe(true);
        done();
      });
    });

    xdescribe('takes config object', () => {
      it('and passes through to beforeAdd', (done) => {
        spyOn(adapter, 'beforeAdd').and.callThrough();
        spyOn(adapter.persistor, 'create').and.callThrough();
        let config = {config: 'object'};
        adapter.add(newObj, config).then(createdObj => {
          expect(adapter.beforeAdd).toHaveBeenCalledWith(newObj, config);
          expect(adapter.persistence.create).toHaveBeenCalledWith(newObj, config);
          done();
        })
        
      })
    });
  });

});