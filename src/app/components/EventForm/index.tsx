import { HTMLAttributes, useContext } from 'react'
import { LanguageContext } from '$app/provider/LanguageProvider'

interface Props extends HTMLAttributes<HTMLFormElement> {
  mode: 'ADD' | 'EDIT',
}

const EventForm = (props: Props) => {
  const { children, mode, onSubmit, ...rest } = props
  const { language } = useContext(LanguageContext)

  return (
    <form onSubmit={onSubmit} { ...rest }>
      {children}
      <button type='submit'>
        {mode === 'ADD' ? language.pages.agenda.events.form.addEvent : language.pages.agenda.events.form.editEvent}
      </button>
    </form>
  )
}

export default EventForm