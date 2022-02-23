import { LanguageTemplate } from '../languageTemplate'

const pt_br: LanguageTemplate = {
  language: 'português brasileiro',
  global: {
    mainTitle: 'Agenda',
    languageOption: 'Idioma',
    aria_sideMenuButton: 'abrir ou fechar o menu lateral',
    aria_themeSwitcher: 'alternar tema de cores claro/escuro',
  },
  pages: {
    home: {
      name: 'Início'
    },
    agenda: {
      name: 'Agenda',
      calendar: {
        aria_nextMonth: 'ir para o próximo mês',
        aria_prevMonth: 'ir para o mês passado'
      },
      events: {

      }
    }
  }
}

export default pt_br

