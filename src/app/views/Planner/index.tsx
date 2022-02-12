import { useContext, useEffect } from 'react'
import { LanguageContext } from '@provider/LanguageProvider'
import { TitleContext } from '@provider/TitleProvider'

const Planner = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle(language.pages.home.name)
  }, [language.pages.home.name, setTitle])

  return (
    <div>
      {language.pages.home.name}
    </div>
  )
}

export default Planner
