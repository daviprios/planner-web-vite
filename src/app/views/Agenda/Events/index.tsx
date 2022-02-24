import { useContext, useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'

import { DatabaseContext } from '$app/provider/DatabaseProvider'
import DatabaseManager from '$data/database/DatabaseManager'
import StorageRequest from '$data/StorageRequest'

import ReminderEvent from './ReminderEventForm'
import { useOnClickOutside } from 'usehooks-ts'
import { LanguageContext } from '$app/provider/LanguageProvider'

const getFullDayRange = (timestamp: number) => {
  const date = new Date(timestamp)
  const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()]
  
  const dateRange = new Date(year, month, day)
  const range: [number, number] = [dateRange.getTime(), 0]
  dateRange.setDate(dateRange.getDate() + 1)
  range[1] = (dateRange.getTime())

  return range
}

const Events = (props: { date: number }) => {
  const { date } = props
  const { database, reconnect } = useContext(DatabaseContext)
  const { language } = useContext(LanguageContext)

  const [events, setEvents] = useState<JSX.Element[]>([])
  useEffect(() => {
    reconnect()
  }, [])

  const getEvents = async (): Promise<JSX.Element[]> => {
    const dayRange = getFullDayRange(date)
    const result = database && await StorageRequest.read<'ReminderEvents'>(database, 'ReminderEvents', { get: 'ALL', return: 'VALUE', index: {
      table: 'timeStart',
      search: IDBKeyRange.bound(dayRange[0], dayRange[1])
    }})
    if(result === undefined || result.length <= 0) return [<li>Empty</li>]
    let list: JSX.Element[] = []
    list = result.map((item) => {
      const { key, value } = item
      if(!value) return <></>

      const { timeStart, timeEnd } = value
      const [dateStart, dateEnd] = [new Date(timeStart), new Date(timeEnd ?? 0)]
      const [startHour, startMinute, endHour, endMinute] = [dateStart.getHours(), dateStart.getMinutes(), dateEnd.getHours(), dateEnd.getMinutes()]

      return (
        <li key={`l${key}`} className={styles.eventItem}>
          <div>
            <h3>{value.name}</h3>
            <p>
              <span>{startHour}:{startMinute < 10 ? '0' : ''}{startMinute}</span> {value.timeEnd ? <span> - {endHour}:{endMinute < 10 ? '0' : ''}{endMinute}</span> : <></>}
            </p>
          </div>
          <div>
            <p>{value.description}</p>
            {value.tags?.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </li>
      )
    })
    return list
  }
  useEffect(() => {
    getEvents().then(res => setEvents(res))
  }, [database, date])

  const [showForm, setShowForm] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  useOnClickOutside(formRef, () => setShowForm(false))

  return (
    <section className={styles.eventsContainer}>
      <h2 className={styles.title}>{language.pages.agenda.events.title}</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => DatabaseManager.deleteDatabase('database')}>TEMP - delete DATABASE</button>
        <button onClick={() => setShowForm(!showForm)}>{language.pages.agenda.events.addEvent}</button>
        <button onClick={() => getEvents().then(res => setEvents(res))}>TEMP - Update</button>
      </div>
      <ul className={styles.eventList}>
        {events}
      </ul>
      <section style={{ display: showForm ? '' : 'none' }} className={styles.formContainer}>
        <button onClick={() => setShowForm(false)} aria-label={language.pages.agenda.events.form.aria_closeButton}>X</button>
        <ReminderEvent ref={formRef} mode={'ADD'}/>
      </section>
    </section>
  )
}

export default Events