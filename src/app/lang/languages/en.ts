import { LanguageTemplate } from '../languageTemplate'

const en: LanguageTemplate = {
  language: 'english',
  global: {
    mainTitle: 'Planner',
    languageOption: 'Language',
    aria_sideMenuButton: 'open or close side menu',
    aria_themeSwitcher: 'switch color themes light/dark'
  },
  pages: {
    home: {
      name: 'Home'
    },
    agenda: {
      name: 'Agenda',
      calendar: {
        aria_nextMonth: 'go to next month',
        aria_prevMonth: 'go to previous month',
      },
      events: {

      }
    }
  }
}

export default en