import styles from './index.module.sass'

const Events = (props: { date: number }) => {
  const { date } = props

  return (
    <section className={styles.eventsContainer}>
      <h2>Events</h2>
      <ul>
        <li>{new Date(date).toUTCString()}</li>
      </ul>
    </section>
  )
}

export default Events