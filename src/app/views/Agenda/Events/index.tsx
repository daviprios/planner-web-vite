import { useContext, useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'
import { DatabaseContext } from '$app/provider/DatabaseProvider'
import DatabaseManager from '$data/database/DatabaseManager'
import StorageRequest from '$data/StorageRequest'
import ReminderEvent from './ReminderEventForm'
import { useOnClickOutside } from 'usehooks-ts'

const Events = (props: { date: number }) => {
  const { date } = props
  const { database, reconnect } = useContext(DatabaseContext)
  const [events, setEvents] = useState<JSX.Element[]>([])

  const getEvents = async (): Promise<JSX.Element[]> => {
    const result = database && await StorageRequest.read<'ReminderEvents'>(database, 'ReminderEvents', { get: 'ALL', return: 'VALUE' })
    if(!result) return [<li>Empty</li>]
    let list: JSX.Element[] = []
    list = result.map((item) => {
      const { key, value } = item
      if(!value) return <></>

      return (
        <li key={`l${key}`}>
          <div>
            <span>{value.name}</span>
            <span>{new Date(value.timeStart).toUTCString()}</span>
            {value.timeEnd ? <span> - {new Date(value.timeEnd).toUTCString()}</span> : <></>}
          </div>
          <div>
            <span>{value.description}</span>
          </div>
        </li>
      )
    })
    return list
  }

  useEffect(() => {
    reconnect()
    getEvents().then(res => setEvents(res))
  }, [])

  const [showForm, setShowForm] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  useOnClickOutside(formRef, () => setShowForm(false))

  return (
    <section className={styles.eventsContainer}>
      <h2>Events</h2>
      <button onClick={() => DatabaseManager.deleteDatabase('database')}>delete DATABASE</button>
      <button onClick={() => setShowForm(!showForm)}>Add Event</button>
      <button onClick={() => getEvents().then(res => setEvents(res))}>Update</button>
      <ul>
        {
          //database && StorageRequest.create<'ReminderEvents'>(database, 'ReminderEvents',
          //{ name: 'Novo Evento', createdAt: Date.now(), fullDay: false, timeStart: Date.now(), updatedAt: Date.now() })
        }
        {events}
      </ul>
      <section style={{ display: showForm ? '' : 'none' }} className={styles.formContainer}>
        <button onClick={() => setShowForm(false)}>X</button>
        <ReminderEvent ref={formRef} />
      </section>
    </section>
  )
}

export default Events