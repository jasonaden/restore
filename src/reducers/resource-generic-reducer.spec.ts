import {defaultGenericReducer} from './resource-generic-reducer';
import {IEntityState} from '../resources/interfaces';
import {Reducer} from 'redux';
import * as Immutable from 'immutable';
import { defaultEntityState } from './resource-generic-reducer';
// import 'angular-mocks';
import {caseData} from '../mocks/case';

// import {
//   FIND_ONE, FINDING_ONE, FOUND_ONE,
//   FIND, FINDING, FOUND,
//   ADD, ADDING, ADDED, 
//   DESTROY, DESTROYING, DESTROYED,
//   PATCH, PATCHING, PATCHED,
//   UPDATE, UPDATING, UPDATED,
//   REFRESH, REFRESHING, REFRESHED,
//   ERROR, SET_ONE
// } from '../resources/constants';

import * as C from '../resources/constants';

let type: string = 'CASE';
let reducer: Reducer;
let uri: string = '/api/v2/cases/1';
let className = 'case'

let verifyClassRecord = (classRecord, targetProp?) => {
  let defaults = ['loadingOne', 'deleting', 'patching', 'adding'];
  // verify targetProp is true
  if( targetProp ) { 
    if( targetProp === 'all' ) {
      defaults.forEach( (item) => {
        expect( classRecord[item] ).toBeDefined(); 
        expect( classRecord[item] ).toBeTruthy();         
      })
      return;
    } else {
      expect( classRecord[targetProp] ).toBeDefined(); 
      expect( classRecord[targetProp] ).toBeTruthy(); 
    }
  }
  if( targetProp ) {
    defaults.splice( defaults.indexOf(targetProp), 1);
  }
  // verify all others are false
  defaults.forEach( (item) => {
    expect(classRecord[item]).toBeDefined();
    expect(classRecord[item]).toBeFalsy();
  })
}

describe('defaultGenericReducer', () => {
  
  beforeEach(() => {
    reducer = defaultGenericReducer(type);    
  })
        
  describe('actions to update statuses', () => {
    it ('returns a default state', () => {   
      let reduc = reducer(undefined, {})
      expect( Immutable.is(reduc, Immutable.Map()) ).toBeTruthy();
    });  

    it ('should create new default entity state records for new types', () => {
      let reduc = reducer(undefined, {
        type: `${C.FINDING_ONE}`,
        meta: {className}
      })
      expect( reduc.get(className) ).toBeDefined();
      expect( reduc.get('customers') ).not.toBeDefined();

      reduc = reducer(reduc, {
        type: `${C.FINDING_ONE}`,
        meta: {className: 'customers'}
      })
      expect( reduc.get(className) ).toBeDefined();
      expect( reduc.get('customers') ).toBeDefined();
    });

    it ('should handle FINDING_ONE and FOUND_ONE', () => {
      let reduc = reducer(undefined, {
        type: `${C.FINDING_ONE}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className), 'loadingOne');

      reduc = reducer(reduc, {
        type: `${C.FOUND_ONE}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className));    
    });

    it ('should handle DESTROYING and DESTROYED', () => {
      let reduc = reducer(undefined, {
        type: `${C.DESTROYING}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className), 'deleting');

      reduc = reducer(reduc, {
        type: `${C.DESTROYED}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className));
    });

    it ('should handle PATCHING and PATCHED', () => {
      let reduc = reducer(undefined, {
        type: `${C.PATCHING}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className), 'patching');

      reduc = reducer(reduc, {
        type: `${C.PATCHED}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className));
    });

    it ('should handle ADDING and ADDED', () => {
      let reduc = reducer(undefined, {
        type: `${C.ADDING}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className), 'adding');

      reduc = reducer(reduc, {
        type: `${C.ADDED}`,
        meta: {className}
      })
      verifyClassRecord(reduc.get(className));
    });
  })

  describe('actions to set/unset values', () => {

    beforeEach( () => {
      uri = '/api/v2/cases/13';
    })

    it ('should handle SET_ONE', () => {
      let reduc = reducer(undefined, {
        type: `${C.SET_ONE}`,
        payload: caseData
      })

      let className = caseData._links.self.class;
      let uri = caseData._links.self.href;

      expect( reduc.get(className).get('items').get(uri) ).toBeDefined();
      expect( reduc.get(className).get('items').get(uri).get('id') ).toEqual(13);
    });
    
    it ('should handle REMOVE_ONE when the payload is passed', () => {
      let reduc = reducer(undefined, {
        type: `${C.SET_ONE}`,
        payload: caseData
      })

      let className = caseData._links.self.class;
      let uri = caseData._links.self.href;

      expect( reduc.get(className).get('items').get(uri) ).toBeDefined();
      expect( reduc.get(className).get('items').get(uri).get('id') ).toEqual(13);

      reduc = reducer(reduc, {
        type: `${C.REMOVE_ONE}`,
        payload: caseData
      })
      expect( reduc.get(className).get('items').get(uri)).not.toBeDefined();
    });

    it ('should handle REMOVE_ONE when the className and uri is passed', () => {
      let reduc = reducer(undefined, {
        type: `${C.SET_ONE}`,
        payload: caseData
      })

      let className = caseData._links.self.class;
      let uri = caseData._links.self.href;

      expect( reduc.get(className).get('items').get(uri) ).toBeDefined();
      expect( reduc.get(className).get('items').get(uri).get('id') ).toEqual(13);

      reduc = reducer(reduc, {
        type: `${C.REMOVE_ONE}`,
        meta: {
          className: className,
          uri: uri
        }
      })
      expect( reduc.get(className).get('items').get(uri)).not.toBeDefined();
    });

  })

  describe('actions to take on error', () => {

    it('should reset all state settngs to false', () => {
      // set all the states to true
      let reduc = reducer(undefined, {
        type: C.FINDING_ONE,
        meta: {className} 
      })
      let list = [C.DESTROYING, C.PATCHING, C.ADDING]
      list.forEach( (item) => {
        reduc = reducer(reduc, {
          type: item,
          meta: {className} 
        })
      })
      // all items should be true
      verifyClassRecord( reduc.get(className), 'all' )

      reduc = reducer(reduc, {
        type: C.ERROR,
        meta: {className}
      })

      // all items should be false
      verifyClassRecord( reduc.get(className) )
    })
   
  })
  
});