
export interface IAdapterPersistence {
  create: (data, params? ) => Promise<any>;
  update: (data, params?, base?) => Promise<any>;
  findOne: (params) => Promise<any>;
  find: (params) => Promise<any>;
  destroy: (params) => Promise<any>;
  toJSON?: (data) => string;
  fromJSON?: (value: string | any) => any;
  reviver?: (key: string, value: any) => any;
}
