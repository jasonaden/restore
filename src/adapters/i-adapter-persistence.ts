
export interface IAdapterPersistence {
  create: (data, options? ) => Promise<any>;
  update: (data, options?, base?) => Promise<any>;
  findOne: (options) => Promise<any>;
  find: (options) => Promise<any>;
}
