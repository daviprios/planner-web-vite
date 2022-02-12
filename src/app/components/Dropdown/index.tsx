import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import './index.sass'

const Dropdown = (props: {
  children: JSX.Element | JSX.Element[],
  text: string
}) => {
  const { children, text } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false))

  return (
    <div className='dropdownContainer'>
      <button className='dropdownContainerButton' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {text}
      </button>
      <ul className='dropdownContainerList' style={{ display: isDropdownOpen ? '' : 'none' }} ref={dropdownRef}>
        {children}
      </ul>
    </div>
  )
}

export default Dropdown
