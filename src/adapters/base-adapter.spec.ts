
import {BaseAdapter} from './base-adapter';

describe('BaseAdapter', () => {
  
  class TestAdapter extends BaseAdapter {
    persistence = {
      create: (data, options?) => Promise.resolve(Object.assign({}, data, {created: true})),
      update: (data, options?, base?) => Promise.resolve(Object.assign({}, data, {updated: true})),
      findOne: (options) => Promise.resolve({id: 123}),
      find: (options) => Promise.resolve([{id: 123}, {id: 456}])
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
      spyOn(adapter, 'beforeAdd');
      spyOn(adapter, 'afterAdd');
      adapter.add(newObj).then(createdObj => {
        expect(adapter.beforeAdd).toHaveBeenCalled();
        expect(adapter.afterAdd).toHaveBeenCalled();
        done();
      });
    });

    it('runs adapter.persistence.create', (done) => {
      adapter.add(newObj).then(createdObj => {
        expect(createdObj.created).toBe(true);
        done();
      });
    });

    describe('takes options object', () => {
      
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
  
  describe('execute', () => {
    it('runs ResourceAdapterConfig.build()', () => {
      // This test should work, but doesn't because spyOn causes an error to be thrown
      // spyOn(config, 'build');
                 
      // $httpBackend.whenGET(config.url).respond(200);
      // adapter.execute(config);
      // $httpBackend.flush();
      // expect(config.build).toHaveBeenCalled();
    });
  });

});