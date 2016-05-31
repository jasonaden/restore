import {toCamelCase} from './toCamelCase';

describe('toCamelCase', () => {

  let strings = [
    "aCamelCaseString", 
    "a-dash-case--string", 
    "a/folder/and/file.url?with=some&params", 
    "A_mixed_snake_CASE_string", 
    "$toadLips are really.warmAnd-$$_COZY©2013"
  ];
  
  it('converts to camelCase', function() {
    var actual, expected;
    expected = ["aCamelCaseString", "aDashCaseString", "aFolderAndFileUrlWithSomeParams", "aMixedSnakeCASEString", "toadLipsAreReallyWarmAndCOZY2013"];
    actual = strings.map(function(x) {
      return toCamelCase(x);
    });
    return expect(actual).toEqual(expected);
  });
  
});