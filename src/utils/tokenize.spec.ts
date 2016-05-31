import {tokenize} from './tokenize';

describe('Tokenize', () => {

  let strings = [
    "aCamelCaseString", 
    "a-dash-case--string", 
    "a/folder/and/file.url?with=some&params", 
    "A_mixed_snake_CASE_string", 
    "$toadLips are really.warmAnd-$$_COZY©2013"
  ];
  
  //[ ' a Camel Case String ', ' a dash case string ', ' a folder and file url with some params ', ' A mixed snake CASE string ', ' toad Lips are really warm And COZY 2013 ' ] //[ 'a Camel Case String', 'a dash case string', 'a folder and file url with some params', 'A mixed snake CASE string', 'toad Lips are really warm And COZY 2013' ]

  it('tokenizes a string', function() {
    var actual, expected;
    expected = ["a Camel Case String", "a dash case string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And COZY 2013"];
    actual = strings.map(function(x) {
      return tokenize(x);
    });
    return expect(actual).toEqual(expected);
  });

  it('tokenizes a string with an optional ignore pattern', function() {
    var actual, expected;
    expected = ["a Camel Case String", "a-dash-case--string", "a folder and file url with some params", "A mixed snake CASE string", "toad Lips are really warm And- COZY 2013"];
    actual = strings.map(function(x) {
      return tokenize(x, "-");
    });
    return expect(actual).toEqual(expected);
  });

});