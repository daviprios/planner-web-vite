import { CSSProperties, FormEvent, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLFormElement> {
  mode: 'ADD' | 'EDIT',
  display: CSSProperties['display']
}

const EventForm = (props: Props) => {
  const { children, mode, display, style, onSubmit, ...rest } = props

  return (
    <section style={{ display, ...style }}>
      <form { ...rest } onSubmit={onSubmit}>
        {children}
        <button type='submit'>
          {mode === 'ADD' ? 'Adicionar' : 'Editar'}
        </button>
      </form>
    </section>
  )
}

export default EventForm