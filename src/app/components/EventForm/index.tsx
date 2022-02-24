import { ForwardedRef, forwardRef, HTMLAttributes, useContext } from 'react'
import { LanguageContext } from '$app/provider/LanguageProvider'

interface Props extends HTMLAttributes<HTMLFormElement> {
  mode: 'ADD' | 'EDIT',
}

const EventForm = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement> | null) => {
  const { children, mode, onSubmit, ...rest } = props
  const { language } = useContext(LanguageContext)

  return (
    <form onSubmit={onSubmit} { ...rest } ref={ref}>
      {children}
      <button type='submit'>
        {mode === 'ADD' ? language.pages.agenda.events.form.addEvent : language.pages.agenda.events.form.editEvent}
      </button>
    </form>
  )
})

export default EventForm