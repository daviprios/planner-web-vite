import { createContext, useState } from 'react'
import { IDBPDatabase } from 'idb'
import { StorageTypes } from '$data/StorageTypes'
import StorageInitializer from '$data/StorageInitializer'

const DatabaseContext = createContext<{ database: IDBPDatabase<StorageTypes> | undefined, reconnect: () => Promise<void>}>({ database: undefined, reconnect: async () => {} })

const DatabaseProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props
  const [database, setDatabase] = useState<IDBPDatabase<StorageTypes> | undefined>(undefined)
  const reconnect = async () => { setDatabase(await StorageInitializer()) }

  return (
    <DatabaseContext.Provider value={{ database, reconnect }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export { DatabaseContext }
export default DatabaseProvider