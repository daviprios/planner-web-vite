import { IDBPDatabase, StoreKey, StoreNames, StoreValue } from 'idb'
import DatabaseCRUD, { SearchType } from './database/DatabaseCRUD'
import { StorageTypes } from './StorageTypes'

class StorageRequest {
  static async create (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[StoreNames<StorageTypes>]['value'])
  { return DatabaseCRUD.create<StorageTypes, StorageTypes[StoreNames<StorageTypes>]['value']>(database, table, data)}

  static async read <DataReturned extends StoreNames<StorageTypes>>(database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, searchType: SearchType, search?: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
    :Promise<{key: number, value: StorageTypes[DataReturned]['value'] | undefined}[]>
  { return DatabaseCRUD.read<StorageTypes>(database, table, searchType, search)}

  static async update (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[StoreNames<StorageTypes>]['value'], search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>, )
  { return DatabaseCRUD.update<StorageTypes, StorageTypes[StoreNames<StorageTypes>]['value']>(database, table, data, search)}

  static async delete (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
  { return DatabaseCRUD.delete<StorageTypes>(database, table, search)}
}

export default StorageRequest