
import {BaseAdapter} from './base-adapter';

describe('BaseAdapter', () => {
  
  class TestAdapter extends BaseAdapter {
    persistence = {
      create: (data, params?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, params?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (params) => Promise.resolve({id: 123}),
      find: (params) => Promise.resolve([{id: 123}, {id: 456}]),
      destroy: (params) => Promise.resolve(null)
    }
  }
  
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

    it('runs toJSON to serialize data', (done) => {
      spyOn(adapter, 'toJSON').and.callThrough();
      adapter.add(newObj).then(createdObj => {
        expect(adapter.toJSON).toHaveBeenCalledWith(newObj);
        done();
      });
    })

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

  describe('has a toJSON method that', () => {
    let adapter;
    let newObj;
      
    beforeEach(() => {
      newObj = {id: 789, $private: 'things'};
      adapter = new BaseAdapter();
    });
    
    it('returns a new object with own enumerable properties', () => {
      let extendedObj = Object.create(newObj, {
        nonEnumProp: {
          enumerable: false,
          value: 'non-enum'
        }
      });
      extendedObj.newProp = 'new';
      let seralizable = adapter.toJSON(extendedObj);
       
      // Make sure non-enumerable prop is accessible
      expect(extendedObj.nonEnumProp).toBe('non-enum');
      // Guarnatee immutable
      expect(seralizable).not.toBe(newObj);
      // Ensure only own enumerable properties are returned
      expect(seralizable.newProp).toBe('new');
      expect(seralizable.id).toBeUndefined();
    });

    it('cleans private properties', () => {
      let seralizable = adapter.toJSON(newObj);
      expect(seralizable.$private).toBeUndefined();
      expect(seralizable.id).toBe(789);
    });
  });

});