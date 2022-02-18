import { DBSchema, IDBPDatabase, IndexKey, IndexNames, StoreKey, StoreNames, StoreValue } from 'idb'

interface SearchType<DatabaseSchema, TableName extends StoreNames<DatabaseSchema>> {
  get: 'ALL' | 'FIRST',
  return: 'VALUE' | 'KEY',
  index?: {
    table: IndexNames<DatabaseSchema, TableName>,
    search?: IDBKeyRange | IndexKey<DatabaseSchema, TableName, IndexNames<DatabaseSchema, TableName>>
  }
  maxReturn?: number,
}

class DatabaseCRUD{
  static async create <DatabaseSchema extends DBSchema, Data extends StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>>>(
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
    data: Data,
    primaryKey?: IDBKeyRange | StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>
  ): Promise<boolean> {
    try{
      const success = await database.add(tableName, data, primaryKey)
      if(success !== undefined) return true
    }
    catch(error){
      console.log(error)
    }
    finally{
      return false
    }
  }

  static async read <DatabaseSchema extends DBSchema, TableName extends StoreNames<DatabaseSchema>>(
    database: IDBPDatabase<DatabaseSchema>,
    tableName: TableName,
    searchType: SearchType<DatabaseSchema, TableName>,
    search?: IDBKeyRange | StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
  ): Promise<{
      key: StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
      value: StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>> | undefined
    }[]> {

    try {
      const keys = searchType.index === undefined
        ? await database.getAllKeys(tableName, search, searchType.maxReturn)
        : await database.getAllKeysFromIndex(tableName, searchType.index.table, searchType.index.search)

      if(!keys) return []

      let result: {
        key: StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
        value: StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>> |
        undefined
      }[] = []

      for(let index = 0; index < keys.length; index++){
        const value = await database.get(tableName, keys[index])
        result.push({ key: keys[index], value })
      }
      return result
    }
    catch(error){
      console.log(error)
      return []
    }
  }

  static async update<DatabaseSchema extends DBSchema, Data extends StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>>> (
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
    data: Data,
    search: IDBKeyRange | StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
  ): Promise<boolean> {
    try{
      const itemToUpdate = await database.getKey(tableName, search)
      if(itemToUpdate === undefined) return false

      const success = await database.put(tableName, data, search)
      if(success !== undefined) return true
    }
    catch(error){
      console.log(error)
    }
    finally{
      return false
    }
  }

  static async delete<DatabaseSchema extends DBSchema> (
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
    search: IDBKeyRange | StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
  ): Promise<boolean> {
    try{
      const itemToDelete = await database.getKey(tableName, search)
      if(itemToDelete === undefined) return false

      const success = await database.delete(tableName, search)
      if(success !== undefined) return true
    }
    catch(error){
      console.log(error)
    }
    finally{
      return false
    }
  }
}

export type { SearchType }
export default DatabaseCRUD