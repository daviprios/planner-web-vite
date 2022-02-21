import { ForwardedRef, forwardRef, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLFormElement> {
  mode: 'ADD' | 'EDIT',
}

const EventForm = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement> | null) => {
  const { children, mode, onSubmit, ...rest } = props

  return (
    <form onSubmit={onSubmit} { ...rest } ref={ref}>
      {children}
      <button type='submit'>
        {mode === 'ADD' ? 'Adicionar' : 'Editar'}
      </button>
    </form>
  )
})

export default EventForm