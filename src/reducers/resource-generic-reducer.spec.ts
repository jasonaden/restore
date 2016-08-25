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
        meta: {uri}
      })
      expect( reduc.get('cases') ).toBeDefined();
      expect( reduc.get('customers') ).not.toBeDefined();

      reduc = reducer(reduc, {
        type: `${C.FINDING_ONE}`,
        meta: {uri: '/api/v2/customers/3'}
      })
      expect( reduc.get('cases') ).toBeDefined();
      expect( reduc.get('customers') ).toBeDefined();
    });

    it ('should handle FINDING_ONE and FOUND_ONE', () => {
      let reduc = reducer(undefined, {
        type: `${C.FINDING_ONE}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'), 'loadingOne');

      reduc = reducer(reduc, {
        type: `${C.FOUND_ONE}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'));    
    });

    it ('should handle DESTROYING and DESTROYED', () => {
      let reduc = reducer(undefined, {
        type: `${C.DESTROYING}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'), 'deleting');

      reduc = reducer(reduc, {
        type: `${C.DESTROYED}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'));
    });

    it ('should handle PATCHING and PATCHED', () => {
      let reduc = reducer(undefined, {
        type: `${C.PATCHING}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'), 'patching');

      reduc = reducer(reduc, {
        type: `${C.PATCHED}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'));
    });

    it ('should handle ADDING and ADDED', () => {
      let reduc = reducer(undefined, {
        type: `${C.ADDING}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'), 'adding');

      reduc = reducer(reduc, {
        type: `${C.ADDED}`,
        meta: {uri}
      })
      verifyClassRecord(reduc.get('cases'));
    });
  })

  describe('actions to set/unset values', () => {

    beforeEach( () => {
      uri = '/api/v2/cases/13';
    })

    it ('should handle SET_ONE', () => {
      let reduc = reducer(undefined, {
        type: `${C.SET_ONE}`,
        meta: {uri}, 
        payload: caseData
      })

      expect( reduc.get(uri) ).toBeDefined();
      expect( reduc.get(uri).get('id') ).toEqual(13);
    });
    
    it ('should handle REMOVE_ONE', () => {
      let reduc = reducer(undefined, {
        type: `${C.SET_ONE}`,
        meta: {uri}, 
        payload: caseData
      })
      expect( reduc.get(uri) ).toBeDefined();
      expect( reduc.get(uri).get('id') ).toEqual(13);

      reduc = reducer(undefined, {
        type: `${C.REMOVE_ONE}`,
        meta: {uri} 
      })
      expect( reduc.get(uri) ).not.toBeDefined();
    });
  })

  describe('actions to take on error', () => {

    it('should reset all state settngs to false', () => {
      // set all the states to true
      let reduc = reducer(undefined, {
        type: C.FINDING_ONE,
        meta: {uri} 
      })
      let list = [C.DESTROYING, C.PATCHING, C.ADDING]
      list.forEach( (item) => {
        reduc = reducer(reduc, {
          type: item,
          meta: {uri} 
        })
      })
      // all items should be true
      verifyClassRecord( reduc.get('cases'), 'all' )

      reduc = reducer(reduc, {
        type: C.ERROR,
        meta: {uri}
      })

      // all items should be false
      verifyClassRecord( reduc.get('cases') )
    })
   
  })
  
});