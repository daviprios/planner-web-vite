import React, { useState, createContext } from 'react'
import { LanguageTemplate } from '$lang/languageTemplate'
import pt_br from '$lang/languages/pt_br'

const LanguageContext = createContext<{
  language: LanguageTemplate,
  setLanguage: React.Dispatch<React.SetStateAction<LanguageTemplate>>
}>({language: pt_br, setLanguage: () => pt_br})

const LanguageProvider = (props: {children: JSX.Element | JSX.Element[]}) => {
  const {children} = props

  const [language, setLanguage] = useState<LanguageTemplate>(pt_br)

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext }
export default LanguageProvider
