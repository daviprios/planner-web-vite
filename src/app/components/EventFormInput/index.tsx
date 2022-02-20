import { DetailedHTMLProps } from 'react'

interface Props extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string,
  label: string,
}

const EventFormInput = (props: Props) => {
  const { className, label, ...rest } = props

  return (
    <label className={className}>
      {label}
      <input { ...rest }/>
    </label>
  )
}

export default EventFormInput