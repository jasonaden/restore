import {defaultReducer} from './resource-reducer';
import {IEntityState} from '../resources/interfaces';
import {Reducer} from 'redux';
// import 'angular-mocks';

import * as C from '../resources/constants';

let type: string = 'CASE';
let reducer: Reducer;

xdescribe('defaultReducer', () => {
  
  beforeEach(() => {
    reducer = defaultReducer(type);    
  })
        
  it ('returns a default state', () => {   
    expect(
       reducer(undefined, {})
     ).toEqual(
       {
          result: [],
          loadingMany: false
        }
     );
  });  
  
  it ('should handle FINDING_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.FINDING}_${type}`
       })
     ).toEqual(
       {
          result: [],
          loadingMany: true,
          loadingOne: false,
          deleting: false,
          patching: false,
          adding: false,
          items: {}
        }
     );
  });
  
  it ('should handle FINDING_ONE_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.FINDING_ONE}_${type}`,
       })
     ).toEqual(
       {
          result: [],
          loadingMany: false,
          loadingOne: true,
          deleting: false,
          patching: false,
          adding: false,
          items: {}
        }
     );
  });
  
  it ('should handle DESTROYING_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.DESTROYING}_${type}`
       })
     ).toEqual(
       {
          result: [],
          loadingMany: false,
          loadingOne: false,
          deleting: true,
          patching: false,
          adding: false,
          items: {}
        }
     );
  });
  
  it ('should handle PATCHING_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.PATCHING}_${type}`
       })
     ).toEqual(
       {
          result: [],
          loadingMany: false,
          loadingOne: false,
          deleting: false,
          patching: true,
          adding: false,
          items: {}
        }
     );
  });
  
  it ('should handle ADDING_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.ADDING}_${type}`
       })
     ).toEqual(
       {
          result: [],
          loadingMany: false,
          loadingOne: false,
          deleting: false,
          patching: false,
          adding: true,
          items: {}
        }
     );
  });
  
  it ('should handle FOUND_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${C.FOUND}_${type}`,
         payload: {
           result: ['/cases/1'],
           items: {
             '/cases/1': {
               _links: {self: {href: '/cases/1'}}, _embedded: {entries: [{}]}
             }
           }
         }
       })
     ).toEqual(
       {
          result: [],
          loadingMany: false,
          loadingOne: false,
          deleting: false,
          patching: false,
          adding: true,
          items: {}
        }
     );
  });
  
});