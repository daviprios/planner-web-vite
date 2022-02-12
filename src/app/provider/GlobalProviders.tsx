import LanguageProvider from './LanguageProvider'
import ThemeProvider from './ThemeProvider'
import TitleProvider from './TitleProvider'

const GlobalProviders = (props: {children: JSX.Element | JSX.Element[]}) => {
  const {children} = props

  return (
    <LanguageProvider>
    <TitleProvider>
    <ThemeProvider>
      {children}
    </ThemeProvider>
    </TitleProvider>
    </LanguageProvider>
  )
}

export default GlobalProviders
