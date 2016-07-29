
import {BaseAdapter} from './base-adapter';
import {BasePersistor} from '../persistors/base-persistor';

describe('BaseAdapter', () => {
  
  let testPersistence = {
      create: (data, params?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, params?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (params) => Promise.resolve({id: 123}),
      find: (params) => Promise.resolve([{id: 123}, {id: 456}]),
      destroy: (params) => Promise.resolve(null)
    }

  class TestAdapter extends BaseAdapter {
    persistence = testPersistence;
  }

  it('defaults to BaseAdapterPersistor if no persistence layer is provided', () => {
    let baseAdapter = new BaseAdapter();
    expect(baseAdapter.persistence instanceof BasePersistor).toBe(true);
  });

  it('uses persistence passed in to constructor', () => {
    let baseAdapter = new BaseAdapter(testPersistence);
    expect(baseAdapter.persistence).toBe(testPersistence);
  });

  describe('has an add method that', () => {
    let adapter;
    let newObj;
      
    beforeEach(() => {
      newObj = {id: 789};
      adapter = new TestAdapter();
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

    describe('takes config object', () => {
      it('and passes through to beforeAdd', (done) => {
        spyOn(adapter, 'beforeAdd').and.callThrough();
        spyOn(adapter.persistence, 'create').and.callThrough();
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