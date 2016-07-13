
import {BaseAdapterPersistence} from './base-adapter-persistence';

describe('BaseAdapterPersistence', () => {
  
  let persistence = new BaseAdapterPersistence();
  let newObj;

  beforeEach(() => {
    newObj = {id: 789, $private: 'things'};
  });
  
  describe('has a toJSON method that', () => {
    let adapter;
    let newObj;
      
    beforeEach(() => {
      newObj = {id: 789, $private: 'things'};
    });
    
    it('returns a new object with own enumerable properties', () => {
      let extendedObj = Object.create(newObj, {
        nonEnumProp: {
          enumerable: false,
          value: 'non-enum'
        }
      });
      extendedObj.newProp = 'new';
      let seralizable = persistence.toJSON(extendedObj);
       
      // Make sure non-enumerable prop is accessible
      expect(extendedObj.nonEnumProp).toBe('non-enum');
      // Guarnatee immutable
      expect(seralizable).not.toBe(newObj);
      // Ensure only own enumerable properties are returned
      expect(seralizable.newProp).toBe('new');
      expect(seralizable.id).toBeUndefined();
    });

    it('cleans private properties', () => {
      let seralizable = persistence.toJSON(newObj);
      expect(seralizable.$private).toBeUndefined();
      expect(seralizable.id).toBe(789);
    });
  });

});