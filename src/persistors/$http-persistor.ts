
import {BasePersistor} from './base-persistor';
import {IHttpPersistorConfig, $httpPersistorConfig} from './$http-persistor-config';
import {generateHttpConfig} from './generate-http-config';
import * as angular from 'angular';

/*
* $http-based persistence layer.
*/
export class $httpPersistor extends BasePersistor {
  // sets the static config
  private static config: IHttpPersistorConfig = new $httpPersistorConfig();
  public static $http: ng.IHttpService;
  public static $q: ng.IQService;
  // uses the instance config for all operations
  private config: IHttpPersistorConfig;

  // Set the instance config based on static config and what's passed in
  constructor (config?: IHttpPersistorConfig) {
    super()
    this.config = $httpPersistor.config.extend(config);
  }

  static setHttp ($http: ng.IHttpService) {
    $httpPersistor.$http = $http;
  }
  static getHttp() {
    return $httpPersistor.$http;
  }

  static setQ ($q: ng.IQService) {
    $httpPersistor.$q = $q;
  }
  static getQ() {
    return $httpPersistor.$q;
  }
  // Running this static method only makes a difference before 
  //  instantiation
  static setConfig (config: IHttpPersistorConfig) {
    $httpPersistor.config = config;
  }
  static getConfig () {
    return $httpPersistor.config;
  }

  // instance methods 
  // Originally, this overrode the instance config set in the constructor
  // 8/9/16: Changed this to build on the instance config set in the 
  //  constructor instead of overriding it. 
  setConfig (config: any) {
    // this.config = $httpPersistor.config.extend(config);
    this.config = this.config.extend(config);
  }
  getConfig () {
    return this.config;
  }

  // Execute request based on the existing config and 
  //  object passed in that overrides the existing config.  
  // execute (config?: any): ng.IPromise<any> {
  execute (config?: Object): ng.IPromise<any> {
    let requestConfig = this.config.extend(config).build();
    return this.doRequest(requestConfig);
  }

  doRequest (requestConfig: IHttpPersistorConfig): ng.IPromise<any> {
    return generateHttpConfig( $httpPersistor.$q, requestConfig )
    .then( (httpConfig) => {
      return $httpPersistor.$http(httpConfig);
    })
  }

  /*
  doRequest_orig (config: IHttpPersistorConfig): ng.IPromise<any> {
    return generateHttpConfig($httpPersistor.$q, this, config)
    .then(config => $httpPersistor.$http(config)
      .then(config.interceptor.response, config.interceptor.responseError)
    );
  }
  */

  findOne(config): ng.IPromise<any> {
    if( ! (config.id && config.className) ) {
      return $httpPersistor.$q.reject("persistor findOne requires className and id"); 
    }
    
    return this.execute(config);

  }

  find(config): ng.IPromise<any> {
    config.method = config.method || 'GET';
    config.className = config.className || 'case';
    return this.execute(config);
  }

  /* OLD
  create (data, params?) {
    return $httpPersistor.$http.post('', data);
  }

  update (data, params?, base?) {
    return $httpPersistor.$http.patch('', data);
  }

  findOne (params) {
    return $httpPersistor.$http.get('');
  }

  find (options): Promise<any[]> {
    return $httpPersistor.$http.get('')
  }

  destroy (params) {
    return $httpPersistor.$http.delete('');
  }
  */

}
