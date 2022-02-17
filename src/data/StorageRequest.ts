import { IDBPDatabase, StoreKey, StoreNames } from 'idb'
import DatabaseCRUD, { SearchType } from './database/DatabaseCRUD'
import { StorageTypes } from './StorageTypes'

class StorageRequest {
  static create (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[StoreNames<StorageTypes>]['value'])
  { DatabaseCRUD.create<StorageTypes, StorageTypes[StoreNames<StorageTypes>]['value']>(database, table, data).then(res => console.log(res)).catch(err => console.log(err)).finally(() => console.log('create')) }

  static read (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, searchType: SearchType, search?: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
  { DatabaseCRUD.read<StorageTypes>(database, table, searchType, search).then(res => console.log(res)).catch(err => console.log(err)).finally(() => console.log('read')) }

  static update (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[StoreNames<StorageTypes>]['value'], search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>, )
  { DatabaseCRUD.update<StorageTypes, StorageTypes[StoreNames<StorageTypes>]['value']>(database, table, data, search).then(res => console.log(res)).catch(err => console.log(err)).finally(() => console.log('update')) }

  static delete (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
  { DatabaseCRUD.delete<StorageTypes>(database, table, search).then(res => console.log(res)).catch(err => console.log(err)).finally(() => console.log('delete')) }
}

export default StorageRequest