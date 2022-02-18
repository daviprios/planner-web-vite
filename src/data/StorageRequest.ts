import { IDBPDatabase, StoreKey, StoreNames } from 'idb'
import DatabaseCRUD, { SearchType } from './database/DatabaseCRUD'
import { StorageTypes } from './StorageTypes'

class StorageRequest {
  static async create <TableName extends StoreNames<StorageTypes>>(database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[TableName]['value'])
  { return DatabaseCRUD.create<StorageTypes, StorageTypes[TableName]['value']>(database, table, data)}

  static async read <TableName extends StoreNames<StorageTypes>>(database: IDBPDatabase<StorageTypes>, table: TableName, searchType: SearchType<StorageTypes, TableName>, search?: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
    :Promise<{key: number, value: StorageTypes[TableName]['value'] | undefined}[]>
  { return DatabaseCRUD.read<StorageTypes, TableName>(database, table, searchType, search)}

  static async update <TableName extends StoreNames<StorageTypes>>(database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, data: StorageTypes[TableName]['value'], search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>, )
  { return DatabaseCRUD.update<StorageTypes, StorageTypes[TableName]['value']>(database, table, data, search)}

  static async delete (database: IDBPDatabase<StorageTypes>, table: StoreNames<StorageTypes>, search: IDBKeyRange | StoreKey<StorageTypes, StoreNames<StorageTypes>>)
  { return DatabaseCRUD.delete<StorageTypes>(database, table, search)}
}

export default StorageRequest