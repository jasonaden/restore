
import {BaseAdapterPersistor} from './base-adapter-persistor';
import {IHttpPersistorConfig, $httpPersistorConfig} from './$http-persistor-config';
import {generateHttpConfig} from './generate-http-config';
import * as angular from 'angular';

/*
* $http-based persistence layer.
*/
export class $httpPersistor extends BaseAdapterPersistor {
  private static config: IHttpPersistorConfig = new $httpPersistorConfig();
  private static $http: ng.IHttpService;
  private static $q: ng.IQService;
  private config: IHttpPersistorConfig;

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

  setConfig (config: any) {
    this.config = $httpPersistor.config.extend(config);
  }

  // Execute request based on given DsResourceAdapterConfig
  execute (config: any): ng.IPromise<any> {
    let requestConfig = this.config.extend(config).build();
    return this.doRequest(requestConfig);
  }

  doRequest (config: IHttpPersistorConfig): ng.IPromise<any> {
    return generateHttpConfig($httpPersistor.$q, this, config)
    .then(config => $httpPersistor.$http(config)
      .then(config.interceptor.response, config.interceptor.responseError)
    );
  }

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

}
