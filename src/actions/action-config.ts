import {IResourceAdapter} from '../resources/interfaces';

export declare type config = {
  adapter: IResourceAdapter,
  url: string,
  schema: any,
  className: string,
  $q: ng.IQService
}