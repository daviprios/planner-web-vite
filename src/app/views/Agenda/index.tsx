import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '$provider/LanguageProvider'
import { TitleContext } from '$provider/TitleProvider'
import Calendar from './Calendar'

import IDBCRUD from '$data/IDBCRUD'
import { BrowserStorageTypes } from '$data/BrowserStorageTypes'
import DatabaseManager from '$data/DatabaseManager'
import { IDBPDatabase } from 'idb'

const Agenda = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle(language.pages.agenda.name)
  }, [language.pages.agenda.name, setTitle])

  const connect = () => {
    DatabaseManager.createDatabase<BrowserStorageTypes>('database', 2, {
      upgrade: (database, oldVersion, newVersion, transaction) => {
        DatabaseManager.createTable(database, 'ReminderEvents')
        DatabaseManager.createTable(database, 'FinancialEvents')
        DatabaseManager.createTable(database, 'ListEvents')
        DatabaseManager.createTable(database, 'ListCollections')
        DatabaseManager.createTable(database, 'TrackerEvents')
        DatabaseManager.createTable(database, 'TrackerCollections')
      }})
      .then(res => setDatabase(res))
      .catch(err => console.log(err))
  }

  const [database, setDatabase] = useState<IDBPDatabase<BrowserStorageTypes> | undefined>()

  useEffect(() => {
    connect()
  }, [])

  const create = () => {
    if(database === undefined) return
    IDBCRUD.create<BrowserStorageTypes, BrowserStorageTypes['ReminderEvents']['value']>(database, 'ReminderEvents',
      { createdAt: Date.now(), fullDay: false, name: 'Evento', timeStart: new Date(2022, 1, 18, 16, 30, 0).getTime(), updatedAt: Date.now() }, 2)
  }

  const read = () => {
    if(database === undefined) return
    IDBCRUD.read<BrowserStorageTypes>(database, 'ReminderEvents', { get: 'FIRST', return: 'VALUE' }).then(res => console.log(res))
    return 
  }

  return (
    <div>
      <button onClick={() => create()}>Create</button>
      Result
      {JSON.stringify(read())}
      <Calendar/>
    </div>
  )
}

export default Agenda
