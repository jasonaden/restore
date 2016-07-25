import {$httpPersistorConfig} from './$http-persistor-config';

fdescribe("$httpPersistorConfig", () => {
  let persistorConfig: $httpPersistorConfig;
  beforeEach(() => {
    persistorConfig = new $httpPersistorConfig({
      url: '/my-resource/{{@id}}',
      method: 'POST',
      transformResponse: function(data) {
        return data;
      },
      interceptor: {
        request: function(request) {
          return request;
        },
        response: function(response) {
          return response;
        },
        responseError: function(response) {
          return Promise.reject(response);
        }
      }
    });
  });

  /**
   * Begin Tests
   */
  it('creates an instance of $httpPersistorConfig', function() {
    expect(persistorConfig instanceof $httpPersistorConfig).toBe(true);
  });
  
  it('extends/inherits an instance', function() {
    persistorConfig = persistorConfig.extend({
      url: '/my-resource/123'
    });
    expect(persistorConfig.method).toBe('POST');
    expect(persistorConfig.url).toBe('/my-resource/123');
    expect(typeof persistorConfig.interceptor).toBe('object');
    expect(typeof persistorConfig.transformResponse).toBe('function');
    expect(persistorConfig instanceof $httpPersistorConfig).toBe(true);
  });
  
  it('defaults to GET request', () => {
    persistorConfig = persistorConfig.extend({method: null});
    expect(persistorConfig.build().method).toBe('GET');
  });
  
  it('defaults source property to configObject.data', () => {
    persistorConfig = persistorConfig.extend({method: 'PUT', data: {id: 101}});
    expect(persistorConfig.build().url).toBe('/my-resource/101')
  });
  
  it('uses configObject.params to replace non-@ prefixed params in query string', () => {
    persistorConfig = persistorConfig.extend({
      url: persistorConfig.url + '?q={{query}}',
      method: 'PUT', 
      data: {id: 101},
      params: {
        query: 'something'
      }
    });
    expect(persistorConfig.build().url).toBe('/my-resource/101?q=something');
  });
  
  it('uses configObject.params to replace non-@ prefixed params in path body', () => {
    // And in path body
    persistorConfig = persistorConfig.extend({
      url: persistorConfig.url + '/{{id}}',
      method: 'PUT', 
      data: {id: 101},
      params: {
        id: 102
      }
    });
    expect(persistorConfig.build().url).toBe('/my-resource/101/102');
  });
  
  
});