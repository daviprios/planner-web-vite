import { DatabaseContext } from '$app/provider/DatabaseProvider'
import StorageRequest from '$data/StorageRequest'
import { useContext, useEffect, useState } from 'react'
import styles from './index.module.sass'

const Events = (props: { date: number }) => {
  const { date } = props
  const { database, reconnect } = useContext(DatabaseContext)
  const [events, setEvents] = useState<JSX.Element[]>([])

  const getEvents = async (): Promise<JSX.Element[]> => {
    const result = database && await StorageRequest.read<'ReminderEvents'>(database, 'ReminderEvents', { get: 'ALL', return: 'VALUE' }, IDBKeyRange.lowerBound(1))
    if(!result) return [<li>Empty</li>]
    let list: JSX.Element[] = []
    list = result.map((item) => {
      const { key, value } = item
      if(!value) return <></>

      return (
        <li key={key}>
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

  return (
    <section className={styles.eventsContainer}>
      <h2>Events</h2>
      <ul>
        <li key={'add'}><button>Add Event</button></li>
        <li key={'update'}><button onClick={() => getEvents().then(res => setEvents(res))}>Update</button></li>
        {events}
      </ul>
    </section>
  )
}

export default Events