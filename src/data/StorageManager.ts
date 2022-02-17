import { IDBPDatabase } from 'idb'
import { BrowserStorageTypes } from './BrowserStorageTypes'

import DatabaseManager from './DatabaseManager'

let database: IDBPDatabase<BrowserStorageTypes> | undefined

(async () => {
  database = await DatabaseManager.createDatabase<BrowserStorageTypes>('database', 3, {
  upgrade: (database, oldVersion, newVersion, transaction) => {
    DatabaseManager.deleteTable(database, 'ReminderEvents')
    DatabaseManager.deleteTable(database, 'FinancialEvents')
    DatabaseManager.deleteTable(database, 'ListEvents')
    DatabaseManager.deleteTable(database, 'ListCollections')
    DatabaseManager.deleteTable(database, 'TrackerEvents')
    DatabaseManager.deleteTable(database, 'TrackerCollections')

    DatabaseManager.createTable(database, 'ReminderEvents', { autoIncrement: true })
    DatabaseManager.createTable(database, 'FinancialEvents', { autoIncrement: true })
    DatabaseManager.createTable(database, 'ListEvents', { autoIncrement: true })
    DatabaseManager.createTable(database, 'ListCollections', { autoIncrement: true })
    DatabaseManager.createTable(database, 'TrackerEvents', { autoIncrement: true })
    DatabaseManager.createTable(database, 'TrackerCollections', { autoIncrement: true })
  }})
  console.log(database)
  }
)();

console.log(database)

export default database