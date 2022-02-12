import { createContext, useState } from 'react'

const TitleContext = createContext<{title: string, setTitle: React.Dispatch<React.SetStateAction<string>>}>({title: 'Planner', setTitle: () => 0})

const TitleProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const [title, setTitle] = useState('Planner')
  const {children} = props

  return (
    <TitleContext.Provider value={{title, setTitle}}>
      {children}
    </TitleContext.Provider>
  )
}

export { TitleContext }
export default TitleProvider
