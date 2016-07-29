
import {BasePersistor} from './base-persistor';
import {IHttpPersistorConfig, $httpPersistorConfig} from './$http-persistor-config';
import {generateHttpConfig} from './generate-http-config';
import * as angular from 'angular';

/*
* $http-based persistence layer.
*/
export class $httpPersistor extends BasePersistor {
  private static config: IHttpPersistorConfig = new $httpPersistorConfig();
  private static $http: ng.IHttpService;
  private static $q: ng.IQService;
  private config: IHttpPersistorConfig;

  // TODO: this requires an IHttpPersistorConfig but 
  //  this.setConfig() takes anything -- should these be consistent?  
  constructor (config?: IHttpPersistorConfig) {
    super()

    this.config = $httpPersistor.config.extend(config);
  }

  static setHttp ($http: ng.IHttpService) {
    $httpPersistor.$http = $http;
  }

  static setQ ($q: ng.IQService) {
    $httpPersistor.$q = $q;
  }
  static setConfig (config: IHttpPersistorConfig) {
    $httpPersistor.config = config;
  }
  static getConfig () {
    return $httpPersistor.config;
  }

  // instance method 
  setConfig (config: any) {
    this.config = $httpPersistor.config.extend(config);
  }
  getConfig () {
    return this.config;
  }

  // Execute request based on the existing config and any new config. 
  execute (config?: any): ng.IPromise<any> {
    let requestConfig = this.config.extend(config).build();
    return this.doRequest(requestConfig);
  }

  doRequest (config: IHttpPersistorConfig): ng.IPromise<any> {
    return generateHttpConfig( $httpPersistor.$q, config )
    .then( (config) => {
      
      return $httpPersistor.$http(config);
    })
      // .then( (ret) => {
      //   console.log("$http-persistor doRequest", ret)
      // })
  }

  /*
  doRequest_orig (config: IHttpPersistorConfig): ng.IPromise<any> {
    return generateHttpConfig($httpPersistor.$q, this, config)
    .then(config => $httpPersistor.$http(config)
      .then(config.interceptor.response, config.interceptor.responseError)
    );
  }
  */

  findOne(data) {
    let config = {
      method: 'GET',
      type: data.type,
      id: data.id
    }

    this.execute(config)
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
