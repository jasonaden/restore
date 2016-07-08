
export interface IAdapterPersistence {
  create: (data, params? ) => Promise<any>;
  update: (data, params?, base?) => Promise<any>;
  findOne: (params) => Promise<any>;
  find: (params) => Promise<any>;
  destroy: (params) => Promise<any>;
}
