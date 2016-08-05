
import {BaseAdapter} from './base-adapter';
import {BasePersistor} from '../persistors/base-persistor';
import {$httpPersistor} from '../persistors/$http-persistor';
import {appSchema} from '../mocks/schemas';
import {caseEmbedded} from '../mocks/caseEmbedded';

import configureStore = require('redux-mock-store')

describe('BaseAdapter', () => {
  
  let $q: ng.IQService;
  let prom: ng.IPromise<any>;

  
  beforeEach(inject(function(_$q_) {
    $q = _$q_;
  }));

  let testPersistor = {
      create: (data, params?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, params?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (params) => Promise.all([caseEmbedded]),
      find: (params) => Promise.resolve([{id: 123}, {id: 456}]),
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

  // Error version -- used when forcing an error from the beforeFindOne()
  // describe('error version should use a promise chain', () => {
  //   let adapter; 
  //   beforeEach( () => {
  //     let tp = Object.assign( {}, testPersistor);
  //     tp.findOne = (params) => { return Promise.all([{id: 567}]) };

  //     adapter = new BaseAdapter(null, null, tp); 

  //     spyOn(adapter, 'findOne').and.callThrough();
  //     spyOn(adapter, 'beforeFindOne').and.callThrough();
  //     spyOn(adapter.persistor, "findOne").and.callThrough();
  //     spyOn(adapter, 'afterFindOne').and.callThrough();
  //   })

  //   it('when invoking findOne', (done) => {
  //     adapter.findOne({id: 123})
  //     .then( () => {
  //       expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
  //       done();
  //     })    
  //   })
  // })


  describe('should use a promise chain', () => {
    let adapter; 
    beforeEach( () => {
      let tp = Object.assign( {}, testPersistor);
      tp.findOne = (params) => { return Promise.all([{id: 567}]) };

      adapter = new BaseAdapter(null, null, tp); 

      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter.persistor, "findOne").and.callThrough();
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

    let adapter, mockStore;
    let types = ['CASE', 'CUSTOMER', 'DRAFT', 'MESSAGE']
    beforeEach( () => {

      mockStore = configureStore()({});
      adapter = new BaseAdapter(appSchema, mockStore, testPersistor);

      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter.persistor, "findOne").and.callThrough();
      spyOn(adapter, 'afterFindOne').and.callThrough();
      spyOn(adapter, 'splitSchema').and.callThrough();
    }) 
 
    it('should be called when a schema is provided', (done) => {
      adapter.findOne({id:123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( caseEmbedded );
        expect(adapter.splitSchema).toHaveBeenCalledWith( caseEmbedded )
        done();
      })
    })

    // TODO: Need to figure out how to test when the splitSchema() recieves
    //  something when it has no data about how to normalize
    xit('should fail if a type is received for which there is no schema', (done) => {
      let caseTemp = Object.assign( {}, caseEmbedded );
      caseTemp._embedded.foo = { id: 1, name: 'bear'};
      // console.log("caseTemp._embedded", caseTemp._embedded.foo)

      let tp = Object.assign( {}, testPersistor);
      tp.findOne = (params) => { return Promise.all([caseTemp]) };
      console.log('tp', tp.findOne.toString());

      mockStore = configureStore()({});
      adapter = new BaseAdapter(appSchema, mockStore, tp);

      try {
        adapter.findOne( {id:123} )
          .then( () => {
            console.log("in the then")
            expect(adapter.splitSchema).toHaveBeenCalled();
            done();
          })
      } catch(err) {
        console.log("err", err)
      }
      // .then( () => {
      //   expect(adapter.splitSchema) toHaveBeenCalledWith( caseEmbedded );
      //   done();
      // })

    })


    // TODO: This is working but am doing a promise.resolve in the beforeFineOne 
    //  Need to determine if that is right or if it should be a promise.all().
    //  It might depend on what is being done in the beforeFindOne. 
    // May need to make them all promise.all() until the end to make sure
    //  that if a promise is used anywhere along the line that it will be 
    //  properly handled. 
    

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