import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '$provider/LanguageProvider'
import { TitleContext } from '$provider/TitleProvider'
import styles from './index.module.sass'

import Calendar from './Calendar'
import Events from './Events'

const Agenda = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle(language.pages.agenda.name)
  }, [language.pages.agenda.name, setTitle])

  const [currentDate, setCurrentDate] = useState(Date.now())

  return (
    <div>
      <article className={styles.agenda}>
        <Calendar setDate={setCurrentDate}/>
        <Events date={currentDate}/>
      </article>
    </div>
  )
}

export default Agenda
