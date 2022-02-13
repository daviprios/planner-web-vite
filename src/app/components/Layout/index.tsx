import { Link } from 'react-router-dom'
import { routePaths } from '$app/routes'
import { useContext, useEffect, useRef, useState } from 'react'

import { ChangeLanguage } from '$lang/ManageLanguage'
import { LanguageContext } from '$provider/LanguageProvider'
import { ThemeContext } from '$provider/ThemeProvider'
import { TitleContext } from '$provider/TitleProvider'

import './index.sass'
import styles from './index.module.sass'
import ThemeSwitcher from './ThemeSwitcher'
import Dropdown from '../Dropdown'
import { useOnClickOutside } from 'usehooks-ts'

const Layout = (props: {children: JSX.Element | JSX.Element[]}) => {
  const { children } = props

  const { language, setLanguage } = useContext(LanguageContext)
  const { theme } = useContext(ThemeContext)
  const { title } = useContext(TitleContext)
  
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  const sideMenuRef = useRef(null)
  useOnClickOutside(sideMenuRef, () => setIsSideMenuOpen(false))

  const closeSideMenuButtonRef = useRef<HTMLButtonElement>(null)
  const openSideMenuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if(isSideMenuOpen) closeSideMenuButtonRef.current?.focus()
  }, [isSideMenuOpen])

  return (
    <div id='Layout' className={`${theme} ${styles.layout}`}>
      <aside className={styles.sideMenu} style={{ display: isSideMenuOpen ? '' : 'none' }} ref={sideMenuRef}>
        <button
          aria-label='ASIDE BUTTON'
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          onKeyPress={() => openSideMenuButtonRef.current?.focus()}
          ref={closeSideMenuButtonRef}>
          =
        </button>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to={routePaths.home}>
                {language.pages.home.name}
              </Link>
            </li>
            <li>
              <Link to={routePaths.agenda}>
                {language.pages.agenda.name}
              </Link>
            </li>
            <li style={{ position: 'fixed', left: '100vw' }}><button onFocus={() => closeSideMenuButtonRef.current?.focus()}></button></li>
          </ul>
        </nav>
      </aside>
      <div className={styles.header}>
        <div>
          <button aria-label={language.aria.global.sideMenuButton} className={styles.sideMenuButton}
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            ref={openSideMenuButtonRef}>
            =
          </button>
          <h1 className={styles.title}>
            { title }
          </h1>
        </div>
        <div>
          <Dropdown text={language.global.languageOption}>
            <li>
              <button lang='en' onClick={() => setLanguage(ChangeLanguage('en'))}>
                English
              </button>
            </li>
            <li>
              <button lang='pt_br' onClick={() => setLanguage(ChangeLanguage('pt_br'))}>
                Português brasileiro
              </button>
            </li>
          </Dropdown>
          <ThemeSwitcher/>
        </div>
      </div>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}

export default Layout
