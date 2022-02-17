import { createContext, useState } from 'react'
import { IDBPDatabase } from 'idb'
import { StorageTypes } from '$data/StorageTypes'
import DatabaseManager from '$data/database/DatabaseManager'

const DatabaseContext = createContext<{ database: IDBPDatabase<StorageTypes> | undefined, reconnect: () => Promise<void>}>({ database: undefined, reconnect: async () => {} })

const DatabaseProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props

  const [database, setDatabase] = useState<IDBPDatabase<StorageTypes> | undefined>(undefined)

  const reconnect = async () => {
    const db = await DatabaseManager.createDatabase<StorageTypes>('database', 3, {
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
      },
      blocking: () => {},
      blocked: () => {},
      terminated: () => {},
    })
    setDatabase(db)
  }

  return (
    <DatabaseContext.Provider value={{ database, reconnect }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export { DatabaseContext }
export default DatabaseProvider