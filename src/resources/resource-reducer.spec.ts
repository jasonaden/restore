import {defaultReducer} from './resource-reducer';
import {IEntityState} from './interfaces';
import {Reducer} from 'redux';
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
} from './constants';

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
          loadingMany: false,
          loadingOne: false,
          deleting: false,
          patching: false,
          adding: false,
          items: {}
        }
     );
  });  
  
  it ('should handle FINDING_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${FINDING}_${type}`
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
         type: `${FINDING_ONE}_${type}`,
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
         type: `${DESTROYING}_${type}`
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
         type: `${PATCHING}_${type}`
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
         type: `${ADDING}_${type}`
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
  
  it ('should handle FIND_CASE', () => {
    expect(
       reducer(undefined, {
         type: `${FIND}_${type}`,
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
          result: ['/cases/1'],
          loadingMany: false,
          loadingOne: false,
          deleting: false,
          patching: false,
          adding: false,
          items: {
            '/cases/1': {
               _links: {self: {href: '/cases/1'}}, _embedded: {entries: [{}]}
             }
          },
          meta: {}
        }
     );
  });
  
});