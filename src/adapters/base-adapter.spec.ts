
import {BaseAdapter} from './base-adapter';
import {BasePersistor} from '../persistors/base-persistor';
import {$httpPersistor} from '../persistors/$http-persistor';
import {appSchema} from '../mocks/schemas';
import {caseEmbedded} from '../mocks/caseEmbedded';

describe('BaseAdapter', () => {
  
  let $q: ng.IQService;
  let prom: ng.IPromise<any>;

  
  beforeEach(inject(function(_$q_) {
    $q = _$q_;
  }));

  let testPersistor = {
      create: (data, params?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, params?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (params) => Promise.resolve(caseEmbedded),
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

  describe('calling methods', () => {

    // instantiate with a dumb persistor
    // spy on what's passed to it and fake the return
    //   make sure the findOne for $http-persistor returns a promise
    // spy on the before*, findOne and after* and make sure they all run 
    // verify what is passed into/out of them 
    let adapter; 
    beforeEach( () => {
      let tp = Object.assign( {}, testPersistor);
      tp.findOne = (params) => { return Promise.resolve({id: 567}) };
      adapter = new BaseAdapter(null, null, tp); 

      spyOn(adapter.persistor, "findOne").and.callThrough();

      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'afterFindOne').and.callThrough();
    })

    // TODO: This is working but am doing a promise.resolve in the beforeFineOne 
    //  Need to determine if that is right or if it should be a promise.all().
    //  It might depend on what is being done in the beforeFindOne. 
    it('should invoke before and after when calling findOne', (done) => {
      adapter.findOne({id: 123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( {id: 567})
        done();
      })    
    })
  })

  describe('splitting data', () => {


    let adapter; 
    beforeEach( () => {
      // persistor findOne returns a case with embedded data
      adapter = new BaseAdapter(appSchema, null, testPersistor);

      spyOn(adapter.persistor, "findOne").and.callThrough();

      spyOn(adapter, 'beforeFindOne').and.callThrough();
      spyOn(adapter, 'findOne').and.callThrough();
      spyOn(adapter, 'afterFindOne').and.callThrough();

      spyOn(adapter, 'splitSchema').and.callThrough();
    })

    // TODO: This is working but am doing a promise.resolve in the beforeFineOne 
    //  Need to determine if that is right or if it should be a promise.all().
    //  It might depend on what is being done in the beforeFindOne. 
    // May need to make them all promise.all() until the end to make sure
    //  that if a promise is used anywhere along the line that it will be 
    //  properly handled. 
    it('should invoke before and after when calling findOne', (done) => {
      adapter.findOne({id: 123})
      .then( () => {
        expect(adapter.beforeFindOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.persistor.findOne).toHaveBeenCalledWith({id: 123});
        expect(adapter.afterFindOne).toHaveBeenCalledWith( caseEmbedded );
        done();
      })

      // expect(adapter.afterFindOne).toHaveBeenCalledWith({id: 123});

      
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