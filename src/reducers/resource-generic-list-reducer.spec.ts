import {defaultGenericListReducer} from './resource-generic-list-reducer';
import {IEntityState} from '../resources/interfaces';
import {Reducer} from 'redux';
import * as Immutable from 'immutable';
// import 'angular-mocks';

import * as C from '../resources/constants';

let type: string = 'CASE';
let reducer: Reducer;

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
  
  beforeEach(() => {
    reducer = defaultGenericListReducer(type);
  })

  fit ('returns a default state', () => {   
    let reduc = reducer(undefined, {})

    // verifyDefault(reduc);
    expect( Immutable.is(reduc, Immutable.Map()) ).toBeTruthy();
  });  

  fit ('should handle FINDING_LIST', () => {
    let uri = '/cases/1/notes';
    
    let reduc = reducer(undefined, {
      type: `${C.FINDING_LIST}`,
      uri: uri
    })
    expect( reduc.get(uri).loading ).toBeTruthy()

    reduc = reducer(reduc, {
      type: `${C.FOUND_LIST}`,
      uri: uri
    })
    expect( reduc.get(uri).loading ).toBeFalsy()
  });

  it ('should handle FOUND_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${C.FOUND}_${type}`
    })

    verifyDefault(reduc, 'loading');
    expect( reduc.loading ).toBeFalsy();
  });

  it ('should handle SET_LIST_PAGE', () => {
    let reduc = reducer(undefined, {
      type: `${C.SET_LIST}_PAGE_${type}`,
      payload: 22
    })

    verifyDefault(reduc, 'page');
    expect( reduc.page ).toEqual(22)
  });

  it ('should handle SET_LIST_COUNT', () => {
    let reduc = reducer(undefined, {
      type: `${C.SET_LIST}_COUNT_${type}`,
      payload: 3
    })

    verifyDefault(reduc, 'count');
    expect( reduc.count ).toEqual(3)
  });

});