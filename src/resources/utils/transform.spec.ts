import {transform} from '../utils';

describe('transform', () => {
    
  it ('transforms a nested object', () => {
    var data = {
      foo: {
        bar: 'fizz'
      }
    };
    let callback = (key, value) => {
      if (key === 'bar' && value === 'fizz') {
        return 'buzz';
      }
      return value;
    };       
    let transformed = transform(data, callback);       
    expect(transformed.foo.bar).toBe('buzz');       
  });    
    
});