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
        title: string,
        addEvent: string,
        form: {
          aria_closeButton: string,
          name: string,
          description: string,
          tags: string,
          tag: string,
          newTag: string,
          addTag: string,
          aria_removeTag: string,
          fullDay: string,
          timeStart: string,
          timeEnd: string,
          dateTime: string,
          hourTime: string,
          place: string,
          addEvent: string,
          editEvent: string,
        }
      }
    }
  }
}

export type { LanguageTemplate }