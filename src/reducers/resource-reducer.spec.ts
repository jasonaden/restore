import {defaultReducer} from './resource-reducer';
import {IEntityState} from '../resources/interfaces';
import {Reducer} from 'redux';
import * as Immutable from 'immutable';
// import 'angular-mocks';

import {
  FIND_ONE, FINDING_ONE, FOUND_ONE,
  FIND, FINDING, FOUND,
  ADD, ADDING, ADDED, 
  DESTROY, DESTROYING, DESTROYED,
  PATCH, PATCHING, PATCHED,
  UPDATE, UPDATING, UPDATED,
  REFRESH, REFRESHING, REFRESHED,
  ERROR
} from '../resources/constants';

let type: string = 'CASE';
let reducer: Reducer;

let verifyDefault = (reduc, exclude?) => {
  let defaults = ['loadingMany', 'loadingOne', 'deleting', 'patching', 'adding'];
  if( exclude ) {
    defaults.splice( defaults.indexOf(exclude), 1);
  }
  defaults.forEach( (item) => {
    expect(reduc[item]).toBeFalsy();
  })
} 

describe('defaultReducer', () => {
  
  beforeEach(() => {
    reducer = defaultReducer(type);    
  })
        
  it ('returns a default state', () => {   
    let reduc = reducer(undefined, {})

    verifyDefault(reduc);
    expect( Immutable.is(reduc.items, Immutable.Map()) ).toBeTruthy();
  });  

  it ('should handle FINDING_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${FINDING}_${type}`
    })

    verifyDefault(reduc, 'loadingMany');
    expect( reduc.loadingMany ).toBeTruthy();
  });

  it ('should handle FINDING_ONE_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${FINDING_ONE}_${type}`
    })

    verifyDefault(reduc, 'loadingOne');
    expect( reduc.loadingOne ).toBeTruthy();
  });

  it ('should handle FOUND_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${FOUND}_${type}`
    })

    verifyDefault(reduc, 'loadingOne');
    expect( reduc.loadingOne ).toBeFalsy();
  });

  it ('should handle DESTROYING_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${DESTROYING}_${type}`
    })

    verifyDefault(reduc, 'deleting');
    expect( reduc.deleting ).toBeTruthy();
  });

  it ('should handle PATCHING_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${PATCHING}_${type}`
    })

    verifyDefault(reduc, 'patching');
    expect( reduc.patching ).toBeTruthy();
  });  

  it ('should handle ADDING_CASE', () => {
    let reduc = reducer(undefined, {
      type: `${ADDING}_${type}`
    })

    verifyDefault(reduc, 'adding');
    expect( reduc.adding ).toBeTruthy();
  });  
 
  
});