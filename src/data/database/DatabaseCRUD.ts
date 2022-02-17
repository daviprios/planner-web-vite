import { DBSchema, IDBPDatabase, StoreKey, StoreNames, StoreValue } from 'idb'

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

  static async read <DatabaseSchema extends DBSchema>(
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
    searchType: { get: 'ALL' | 'FIRST', return: 'VALUE' | 'KEY', maxReturn?: number },
    search?: IDBKeyRange | StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>,
  ): Promise<StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>[] |
    StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>>[] |
    [StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>> |
      StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>> |
      undefined]> {

    let result: StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>>[] |
    StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>>[] |
    [StoreKey<DatabaseSchema, StoreNames<DatabaseSchema>> |
      StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>> |
      undefined]
      = []

    try {
      if(searchType.get === 'ALL' || searchType.return === 'KEY') result = await database.getAllKeys(tableName, search, searchType.maxReturn)
      if(searchType.get === 'ALL' || searchType.return === 'VALUE') result = await database.getAll(tableName, search, searchType.maxReturn)
      if(searchType.get === 'FIRST'){
        if(search === undefined) return []
        if(searchType.return === 'KEY') result = [await database.getKey(tableName, search) ?? undefined]
        if(searchType.return === 'VALUE') result = [await database.get(tableName, search)]
      }
    }
    catch(error){
      console.log(error)
    }
    finally{
      return result
    }
  }

  static async update<DatabaseSchema extends DBSchema> (
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
    data: StoreValue<DatabaseSchema, StoreNames<DatabaseSchema>>,
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
      return false
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
      return false
    }
    finally{
      return false
    }
  }
}

export default DatabaseCRUD