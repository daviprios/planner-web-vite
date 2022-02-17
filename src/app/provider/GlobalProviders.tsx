import DatabaseProvider from './DatabaseProvider'
import LanguageProvider from './LanguageProvider'
import ThemeProvider from './ThemeProvider'
import TitleProvider from './TitleProvider'

const GlobalProviders = (props: {children: JSX.Element | JSX.Element[]}) => {
  const {children} = props

  return (
    <DatabaseProvider>
    <LanguageProvider>
    <TitleProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
    </TitleProvider>
    </LanguageProvider>
    </DatabaseProvider>
  )
}

export default GlobalProviders
