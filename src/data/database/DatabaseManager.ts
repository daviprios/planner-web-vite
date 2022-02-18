import { DBSchema, IDBPDatabase, StoreNames, openDB, deleteDB,
  DeleteDBCallbacks, OpenDBCallbacks, IDBPTransaction, IDBPObjectStore, IndexNames} from 'idb';

class DatabaseManager{
  static openDatabase <DatabaseSchema extends DBSchema>(
    databaseName: string,
  ): Promise<IDBPDatabase<DatabaseSchema>>{
    return openDB(databaseName)
  }
  
  static closeDatabase <DatabaseSchema extends DBSchema>(
    database: IDBPDatabase<DatabaseSchema>,
  ){
    database.close()
  }

  static createDatabase <DatabaseSchema extends DBSchema>(
    databaseName: string,
    version: number,
    events: OpenDBCallbacks<DatabaseSchema>
  ): Promise<IDBPDatabase<DatabaseSchema>>{
    return openDB(databaseName, version, events)
  }

  static deleteDatabase <DatabaseName extends string>(
    databaseName: DatabaseName,
    blocked?: DeleteDBCallbacks,
  ){
    deleteDB(databaseName, blocked)
  }

  static createTable <DatabaseSchema extends DBSchema, TableName extends StoreNames<DatabaseSchema>>(
    database: IDBPDatabase<DatabaseSchema>,
    tableName: TableName,
    options?: IDBObjectStoreParameters 
  ): boolean {
    try{
      database.createObjectStore(tableName, options)
      return true
    }
    catch(error){
      console.log(error)
    }
    finally{
      return false
    }
  }

  static deleteTable <DatabaseSchema extends DBSchema>(
    database: IDBPDatabase<DatabaseSchema>,
    tableName: StoreNames<DatabaseSchema>,
  ): boolean {
    try{
      const success = database.deleteObjectStore(tableName)
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

  static getTablesName <DatabaseSchema extends DBSchema>(
    database: IDBPDatabase<DatabaseSchema>,
  ) {
    return database.objectStoreNames
  }
}

export default DatabaseManager