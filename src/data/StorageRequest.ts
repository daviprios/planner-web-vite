/**

  const { database, reconnect } = useContext(DatabaseContext)

  useEffect(() => {
    reconnect()
  }, [])

  const create = () => {
    if(database === undefined) return
    DatabaseCRUD.create<StorageTypes, StorageTypes['ReminderEvents']['value']>(database, 'ReminderEvents',
      { createdAt: Date.now(), fullDay: false, name: 'Evento', timeStart: new Date(2022, 1, 18, 16, 30, 0).getTime(), updatedAt: Date.now() }, 2)
  }

  const read = () => {
    if(database === undefined) return
    DatabaseCRUD.read<StorageTypes>(database, 'ReminderEvents', { get: 'FIRST', return: 'VALUE' }).then(res => console.log(res))
    return 
  }

*/

import { IDBPDatabase } from "idb"
import DatabaseCRUD from "./database/DatabaseCRUD"
import { StorageTypes } from "./StorageTypes"

class StorageRequest {
  static createReminder (database: IDBPDatabase<StorageTypes>, data: StorageTypes['ReminderEvents']['value']) {
    DatabaseCRUD.create<StorageTypes, StorageTypes['ReminderEvents']['value']>(database, 'ReminderEvents', data)
  }

  static readRemider (database: IDBPDatabase<StorageTypes>, searchType: { get: 'ALL' | 'FIRST', return: 'VALUE' | 'KEY', maxReturn?: number }) {
    DatabaseCRUD.read<StorageTypes>(database, 'ReminderEvents', searchType).then(res => console.log(res))
  }
}

export default StorageRequest