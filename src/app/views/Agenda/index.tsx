import { useContext, useEffect } from 'react'
import { LanguageContext } from '$provider/LanguageProvider'
import { TitleContext } from '$provider/TitleProvider'

const Agenda = () => {
  const { language } = useContext(LanguageContext)
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle(language.pages.agenda.name)
  }, [language.pages.agenda.name, setTitle])

  return (
    <article>
      <section>
        <div>
          <button>{'<'}</button>
          <span>
            <span>DIA</span>, <span>MES</span>
          </span>
          <button>{'>'}</button>
        </div>
        <div>
          
        </div>
      </section>
      <section>
        <ul>
          <li>
            Item 1
          </li>
          <li>
            Item 2
          </li>
          <li>
            Item 3
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Agenda
