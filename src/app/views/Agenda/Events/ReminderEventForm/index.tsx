import EventFormInput from '$components/EventFormInput'
import EventForm from '$components/EventForm'
import { CSSProperties, Dispatch, Reducer, SetStateAction, useContext, useEffect, useReducer, useState } from 'react'
import StorageRequest from '$data/StorageRequest'
import { DatabaseContext } from '$app/provider/DatabaseProvider'

interface Data {
  name: string,
  description?: string,
  tags?: string[],
  timeStart: number,
  timeEnd?: number,
  fullDay: boolean,
  createdAt: number,
  updatedAt: number,
  alarmTime?: number,
  place?: string
}
interface Action{
  type: 'SET_NAME' | 'SET_DESCRIPTION' | 'SET_TIME_START' | 'SET_TIME_END' |
    'SET_FULL_DAY' | 'SET_CREATED_AT' | 'SET_UPDATED_AT' | 'SET_ALARM_TIME' |
    'SET_PLACE' | 'ADD_TAG' | 'REMOVE_TAG',
  payload: {
    string?: string,
    number?: number,
    boolean?: boolean
  }
}
const reducer = (state: Data, action: Action): Data => {
  const { type, payload } = action
  let tags: string[] = state.tags || []

  switch(type){
    case 'SET_NAME':
      return { ...state, name: payload.string ?? state.name }
    case 'SET_DESCRIPTION':
      return { ...state, description: payload.string ?? state.description }
    case 'ADD_TAG':
      if(payload.string && !tags.includes(payload.string)) tags.push(payload.string)
      return { ...state, tags }
    case 'REMOVE_TAG':
      if(payload.string) tags = tags.filter((tag: string) => tag !== payload.string)
      return { ...state, tags }
    case 'SET_TIME_START':
      return { ...state, timeStart: payload.number ?? state.timeStart }
    case 'SET_TIME_END':
      return { ...state, timeEnd: payload.number ?? state.timeEnd }
    case 'SET_FULL_DAY':
      return { ...state, fullDay: payload.boolean ?? state.fullDay }
    case 'SET_CREATED_AT':
      return { ...state, createdAt: payload.number ?? state.createdAt }
    case 'SET_UPDATED_AT':
      return { ...state, updatedAt: payload.number ?? state.updatedAt }
    case 'SET_ALARM_TIME':
      return { ...state, alarmTime: payload.number ?? state.alarmTime }
    case 'SET_PLACE':
      return { ...state, place: payload.string ?? state.place }
    default:
      throw new Error('')
  }
}

const timeSlot = { date: 0, hour: 1 }
const ReminderEventForm = (props: { display: CSSProperties['display'] }) => {
  const { display } = props
  const [data, dataDispatch] = useReducer<Reducer<Data, Action>>(reducer,
    { name: '', timeStart: 0, fullDay: false, createdAt: Date.now(),
    updatedAt: Date.now(), tags: [] })

  const [timeStart, setTimeStart] = useState<[string, string]>(['2000-12-01', '12:00'])
  const [timeEnd, setTimeEnd] = useState<[string, string]>(['2000-12-01', '12:00'])

  const setTime = (timeStore: [string, string], setTimeStore: Dispatch<SetStateAction<[string, string]>>, state: Action['type'], timeType: 'DATE' | 'HOUR', value: string) => {
    const time: [string, string] = [...timeStore]
    switch(timeType){
      case 'DATE':
        time[timeSlot.date] = value
        setTimeStore(time)
        break
      case 'HOUR':
        time[timeSlot.hour] = value
        setTimeStore(time)
        break
      default:
        throw new Error('Not such time type')
    }

    const date = time[timeSlot.date].split('-')
    const hour = time[timeSlot.hour].split(':')
    dataDispatch({ type: state, payload: {
      number: new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(hour[0]), Number(hour[1]), 0).getTime()
    } })
  }

  const [currentTag, setCurrentTag] = useState('')

  const { database, reconnect } = useContext(DatabaseContext)
  useEffect(() => {
    reconnect()
  }, [])

  return (
    <EventForm mode='ADD' display={display} onSubmit={(event) => {
      event.preventDefault()
      if(!database) {
        alert('Couldn\' store. Try refreshing the page.')
        return
      }
      data.createdAt = Date.now()
      data.updatedAt = Date.now()
      StorageRequest.create<'ReminderEvents'>(database, 'ReminderEvents', data)
    }}>
      <EventFormInput label='Name' type='text' placeholder='Name' required value={data.name}
        onChange={(event) => dataDispatch({ type: 'SET_NAME', payload: { string: event.currentTarget.value } })}/>
      <EventFormInput label='Description' type='text' placeholder='Description' value={data.description}
        onChange={(event) => dataDispatch({ type: 'SET_DESCRIPTION', payload: { string: event.currentTarget.value } })}/>
        
      <EventFormInput label='Tags' type='text' placeholder='Name' value={currentTag}
        onChange={(event) => setCurrentTag(event.currentTarget.value)}/>
      <button onClick={() => {
        if(data.tags?.includes(currentTag)) return
        dataDispatch({ type: 'ADD_TAG', payload: { string: currentTag } })
        setCurrentTag('')
      }}>Add Tag</button>
      {data.tags?.map((tag) => {
        return <span>{tag}<button onClick={() => dataDispatch({ type: 'REMOVE_TAG', payload: { string: tag } })}>X</button></span>
      })}

      <EventFormInput label='Full Day' type='checkbox' placeholder='Full Day' checked={data.fullDay}
        onChange={(event) => dataDispatch({ type: 'SET_FULL_DAY', payload: { boolean: event.currentTarget.checked } })}/>

      <EventFormInput label='Time Start Date' type='date' required value={timeStart[timeSlot.date]}
        onChange={(event) => setTime(timeStart, setTimeStart, 'SET_TIME_START', 'DATE', event.currentTarget.value)}/>
      <EventFormInput label='Time Start Hour' type='time' required value={timeStart[timeSlot.hour]}
        onChange={(event) => setTime(timeStart, setTimeStart, 'SET_TIME_START', 'HOUR', event.currentTarget.value)}/>

      <EventFormInput label='Time End Date' type='date' value={timeEnd[timeSlot.date]}
        onChange={(event) => setTime(timeEnd, setTimeEnd, 'SET_TIME_END', 'DATE', event.currentTarget.value)}/>
      <EventFormInput label='Time End Hour' type='time' value={timeEnd[timeSlot.hour]}
        onChange={(event) => setTime(timeEnd, setTimeEnd, 'SET_TIME_END', 'HOUR', event.currentTarget.value)}/>

      <EventFormInput label='Place' type='text' placeholder='Place' value={data.place}
        onChange={(event) => dataDispatch({ type: 'SET_PLACE', payload: { string: event.currentTarget.value } })}/>
    </EventForm>
  )
}

export default ReminderEventForm