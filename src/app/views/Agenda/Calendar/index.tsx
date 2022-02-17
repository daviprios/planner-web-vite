import { Reducer, useEffect, useReducer } from 'react'
import styles from './index.module.sass'
import CalendarLogic from '$logic/CalendarLogic'

interface ReducerState {
  date: number,
  currentDate: number,
  daysInMonth: number,
}
interface ReducerAction {
  type: 'SET_DAY' | 'PREV_MONTH' | 'NEXT_MONTH' | 'GO_TO',
  payload: number
}
const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  const { type, payload } = action

  const date = new Date(state.date)
  const timestamp = date.getTime()
  switch(type){
    case 'SET_DAY':
      return { ...state, currentDate: CalendarLogic.setDay(timestamp, payload) }
    case 'PREV_MONTH':
      const prev = CalendarLogic.getPreviousMonth(timestamp)
      return { ...state, date: prev, daysInMonth: CalendarLogic.getMonthDaysAmount(prev) }
    case 'NEXT_MONTH':
      const next = CalendarLogic.getNextMonth(timestamp)
      return { ...state, date: next, daysInMonth: CalendarLogic.getMonthDaysAmount(next) }
    case 'GO_TO':
      return { ...state, date: payload, daysInMonth: CalendarLogic.getMonthDaysAmount(new Date(payload).getUTCMonth()) }
    default:
      throw new Error('')
  }
}

const Calendar = (props: { setDate: React.Dispatch<React.SetStateAction<number>> }) => {
  const { setDate } = props

  const [state, dispatch] = useReducer<Reducer<ReducerState, ReducerAction>>(
    reducer,
    { date: Date.now(), daysInMonth: CalendarLogic.getMonthDaysAmount(Date.now()), currentDate: Date.now() }
  )

  useEffect(() => {
    setDate(state.currentDate)
  }, [state.currentDate])

  const generateCalendar = (timestamp: number) => {
    let days: JSX.Element[] = []

    const [weekdayIndex, daysInMonth] =
      [CalendarLogic.getWeekdayIndex(new Date(new Date(timestamp).setUTCDate(1)).getTime()),
      CalendarLogic.getMonthDaysAmount(timestamp)]

    for(let offset = 1; offset <= weekdayIndex; offset++)
      days.push(
        <li key={`blank-s${offset}`}
          className={styles.calendarCell}>
        </li>
      )

    for(let day = 1; day <= daysInMonth; day++)
      days.push(
        <li key={`d${day}`}
          className={styles.calendarCell}>
          <button className={styles.calendarCellButton}
            data-active={state.currentDate === new Date(state.date).setUTCDate(day)}
            onClick={() => dispatch({ type: 'SET_DAY', payload: day })}>
            {day}
          </button>
        </li>
      )
    
    for(let offset = 1; offset <= 7 - ((weekdayIndex + daysInMonth) % 7); offset++)
      days.push(
        <li key={`blank-e${offset}`}
          className={styles.calendarCell}>
        </li>
      )

    return days
  }

  return (
    <section className={styles.calendarContainer}>
      <div className={styles.header}>
        <button onClick={() => dispatch({ type: 'PREV_MONTH', payload: 0 })}>{'<'}</button>
        <span>
          <span>{new Date(state.date).getUTCMonth() + 1}</span>, <span>{new Date(state.date).getUTCFullYear()}</span>
        </span>
        <button onClick={() => dispatch({ type: 'NEXT_MONTH', payload: 0 })}>{'>'}</button>
      </div>
      <div>
        <ul className={styles.calendarGrid}>
          {generateCalendar(state.date)}
        </ul>
      </div>
    </section>
  )
}

export default Calendar