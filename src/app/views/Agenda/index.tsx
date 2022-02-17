import { useContext, useEffect } from 'react'
import { LanguageContext } from '$provider/LanguageProvider'
import { TitleContext } from '$provider/TitleProvider'
import { DatabaseContext } from '$provider/DatabaseProvider'
import Calendar from './Calendar'
import StorageRequest from '$data/StorageRequest'

const Agenda = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)
  const { database, reconnect } = useContext(DatabaseContext)

  useEffect(() => {
    setTitle(language.pages.agenda.name)
  }, [language.pages.agenda.name, setTitle])
  
  useEffect(() => {
    reconnect()
  }, [])

  return (
    <div>
      <button onClick={() => database && StorageRequest.createReminder(database, { createdAt: Date.now(), fullDay: false, name: 'Evento', timeStart: new Date(2022, 1, 18, 16, 30, 0).getTime(), updatedAt: Date.now() })}>Create</button>
      Result
      {database && StorageRequest.readRemider(database, { get: 'FIRST', return: 'VALUE' })}
      <Calendar/>
    </div>
  )
}

export default Agenda
