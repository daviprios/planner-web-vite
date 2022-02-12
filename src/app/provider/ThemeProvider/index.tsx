import { createContext, useState } from 'react'

type Theme = 'theme-light' | 'theme-dark'

const themes: {[name: string]: Theme} = {
  light: 'theme-light',
  dark: 'theme-dark'
}

const ThemeContext = createContext<{theme: Theme, setTheme: React.Dispatch<React.SetStateAction<Theme>>}>({theme: themes.light, setTheme: () => 0})

const ThemeProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const [theme, setTheme] = useState<Theme>(themes.light)
  const {children} = props

  return (
    <ThemeContext.Provider value={{theme, setTheme}} >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
export default ThemeProvider
