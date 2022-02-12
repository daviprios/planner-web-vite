interface LanguageTemplate {
  language: string,
  aria: {
    global: {
      sideMenuButton: string,
      themeSwitcher: string
    }
  },
  global: {
    mainTitle: string,
    languageOption: string
  },
  pages: {
    home: {
      name: string
    },
    agenda: {
      name: string
    }
  }
}

export type { LanguageTemplate }