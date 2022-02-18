import DatabaseManager from './database/DatabaseManager'
import { StorageTypes } from './StorageTypes'

const StorageInitializer = async () => {
  return await DatabaseManager.createDatabase<StorageTypes>('database', 1, {
    upgrade: (database, oldVersion, newVersion, transaction) => {
      switch(oldVersion){
        case undefined:
        case 0:
          DatabaseManager.createTable(database, 'ReminderEvents', { autoIncrement: true })
          transaction.objectStore('ReminderEvents').createIndex('name', 'name', { unique: false })
            .objectStore.createIndex('tags', 'tags', { unique: false, multiEntry: true })
            .objectStore.createIndex('timeStart', 'timeStart', { unique: false })
            .objectStore.createIndex('place', 'place', { unique: false })

          DatabaseManager.createTable(database, 'FinancialEvents', { autoIncrement: true })
          transaction.objectStore('FinancialEvents').createIndex('name', 'name', { unique: false })
              .objectStore.createIndex('tags', 'tags', { unique: false, multiEntry: true })
              .objectStore.createIndex('timeStart', 'timeStart', { unique: false })
              .objectStore.createIndex('from', 'from', { unique: false })
              .objectStore.createIndex('to', 'to', { unique: false })
              .objectStore.createIndex('moneyAmount', 'moneyAmount', { unique: false })
              .objectStore.createIndex('reason', 'reason', { unique: false })
              .objectStore.createIndex('type', 'type', { unique: false })

          DatabaseManager.createTable(database, 'ListEvents', { autoIncrement: true })
          transaction.objectStore('ListEvents').createIndex('name', 'name', { unique: false })
              .objectStore.createIndex('tags', 'tags', { unique: false, multiEntry: true })
              .objectStore.createIndex('timeStart', 'timeStart', { unique: false })
              .objectStore.createIndex('listCollectionId', 'listCollectionId', { unique: false })

          DatabaseManager.createTable(database, 'ListCollections', { autoIncrement: true })
          transaction.objectStore('ListCollections').createIndex('name', 'name', { unique: false })

          DatabaseManager.createTable(database, 'TrackerEvents', { autoIncrement: true })
          transaction.objectStore('TrackerEvents').createIndex('name', 'name', { unique: false })
              .objectStore.createIndex('tags', 'tags', { unique: false, multiEntry: true })
              .objectStore.createIndex('timeStart', 'timeStart', { unique: false })
              .objectStore.createIndex('trackerCollectionId', 'trackerCollectionId', { unique: false })

          DatabaseManager.createTable(database, 'TrackerCollections', { autoIncrement: true })
          transaction.objectStore('TrackerCollections').createIndex('name', 'name', { unique: false })
      }
    },
    blocking: () => {console.log('database blocking')},
    blocked: () => {console.log('database blocked')},
    terminated: () => {console.log('database terminated')},
  })
}

export default StorageInitializer