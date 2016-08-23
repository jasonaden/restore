import {defaultGenericListReducer} from './resource-generic-list-reducer';
import {IEntityState} from '../resources/interfaces';
import {Reducer} from 'redux';
import * as Immutable from 'immutable';
// import 'angular-mocks';

import * as C from '../resources/constants';

let type: string = 'CASE';
let reducer: Reducer;
let uri: string = '/cases/1/notes';

let verifyDefault = (reduc, exclude?) => {
  // let defaults = ['loadingMany', 'loadingOne', 'deleting', 'patching', 'adding'];
  let defaults = ['loadingMany', 'page', 'count'];
  if( exclude ) {
    defaults.splice( defaults.indexOf(exclude), 1);
  }
  defaults.forEach( (item) => {
    expect(reduc[item]).toBeFalsy();
  })
} 

describe('defaultGenericListReducer', () => {
  describe('initialization tests', () => {
    beforeEach(() => {
      reducer = defaultGenericListReducer(type);
    })

    it ('returns a default state', () => {   
      let reduc = reducer(undefined, {})

      // verifyDefault(reduc);
      expect( Immutable.is(reduc, Immutable.Map()) ).toBeTruthy();
    });  

    it ('should handle FINDING_LIST', () => {   
      let reduc = reducer(undefined, {
        type: `${C.FINDING_LIST}`,
        meta: {uri}
      })
      expect( reduc.get(uri).get('loading') ).toBeTruthy()

      reduc = reducer(reduc, {
        type: `${C.FOUND_LIST}`,
        meta: {uri}
      })
      expect( reduc.get(uri).loading ).toBeFalsy()
    });
  });

  describe('instantiated tests', () => {
    let reduc;
    beforeEach(()=>{
      reduc = reducer(undefined, {
        type: `${C.FINDING_LIST}`,
        meta: {uri}
      });
    });

    it ('should handle SET_LIST_RESULT', () => {
      reduc = reducer(reduc, {
        type: `${C.SET_LIST_RESULT}`,
        meta: {uri},
        payload: [1,2,3]
      })

      expect( reduc.get(uri).get('result').get(1).toJS()).toEqual([1,2,3])
    });

    it ('should handle SET_LIST_PAGE', () => {
      reduc = reducer(reduc, {
        type: `${C.SET_LIST_PAGE}`,
        meta: {uri},
        payload: 2
      });

      expect( reduc.get(uri).page ).toEqual(2)
    });

    it ('should handle SET_LIST_COUNT', () => {
      reduc = reducer(reduc, {
        type: `${C.SET_LIST_COUNT}`,
        meta: {uri},
        payload: 150
      })

      expect( reduc.get(uri).count ).toEqual(150)
    });
  });

});