import DatabaseManager from "./database/DatabaseManager"
import { StorageTypes } from "./StorageTypes"

const StorageInitializer = async () => {
  return await DatabaseManager.createDatabase<StorageTypes>('database', 3, {
    upgrade: (database, oldVersion, newVersion, transaction) => {
      switch(oldVersion){
        case undefined:
        case 0:
          DatabaseManager.createTable(database, 'ReminderEvents', { autoIncrement: true })
          DatabaseManager.createTable(database, 'FinancialEvents', { autoIncrement: true })
          DatabaseManager.createTable(database, 'ListEvents', { autoIncrement: true })
          DatabaseManager.createTable(database, 'ListCollections', { autoIncrement: true })
          DatabaseManager.createTable(database, 'TrackerEvents', { autoIncrement: true })
          DatabaseManager.createTable(database, 'TrackerCollections', { autoIncrement: true })
      }
    },
    blocking: () => {console.log('database blocking')},
    blocked: () => {console.log('database blocked')},
    terminated: () => {console.log('database terminated')},
  })
}

export default StorageInitializer