import { useContext, useEffect } from 'react'
import { LanguageContext } from '$provider/LanguageProvider'
import { TitleContext } from '$provider/TitleProvider'
import Calendar from './Calendar'

const Agenda = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle(language.pages.agenda.name)
  }, [language.pages.agenda.name, setTitle])

  return (
    <div>
      <Calendar/>
    </div>
  )
}

export default Agenda
