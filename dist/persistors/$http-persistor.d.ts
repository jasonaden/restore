import { BasePersistor } from './base-persistor';
import { IHttpPersistorConfig } from './$http-persistor-config';
import * as angular from 'angular';
import { IPersistorConfig } from '../resources/interfaces';
export declare class $httpPersistor extends BasePersistor {
    private static config;
    static $http: ng.IHttpService;
    static $q: ng.IQService;
    private config;
    constructor(config?: IHttpPersistorConfig);
    static setHttp($http: ng.IHttpService): void;
    static getHttp(): angular.IHttpService;
    static setQ($q: ng.IQService): void;
    static getQ(): angular.IQService;
    static setConfig(config: IHttpPersistorConfig): void;
    static getConfig(): IHttpPersistorConfig;
    setConfig(config: any): void;
    getConfig(): IHttpPersistorConfig;
    execute(persistorConfig?: IPersistorConfig): ng.IPromise<any>;
    doRequest(requestConfig: IHttpPersistorConfig): ng.IPromise<any>;
    findOne(persistorConfig: IPersistorConfig): ng.IPromise<any>;
    find(config: any): ng.IPromise<any>;
    update(config: any): ng.IPromise<any>;
    destroy(config: any): ng.IPromise<any>;
    create(config: any): angular.IPromise<any>;
}
