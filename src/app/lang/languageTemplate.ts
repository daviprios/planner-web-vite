interface LanguageTemplate {
  language: string,
  global: {
    mainTitle: string,
    languageOption: string,
    aria_sideMenuButton: string,
    aria_themeSwitcher: string
  },
  pages: {
    home: {
      name: string
    },
    agenda: {
      name: string
      calendar: {
        aria_prevMonth: string
        aria_nextMonth: string
      }
      events: {

      }
    }
  }
}

export type { LanguageTemplate }