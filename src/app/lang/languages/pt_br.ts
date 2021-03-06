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
        addEvent: 'Adicionar Evento',
        title: 'Eventos',
        form: {
          aria_closeButton: 'fechar menu de adição de evento',
          name: 'Nome',
          description: 'Descrição',
          tags: 'Etiquetas',
          tag: 'Etiqueta',
          newTag: 'Nova Etiqueta',
          addTag: 'Adicionar Etiqueta',
          aria_removeTag: 'remover etiqueta',
          fullDay: 'Todo o dia',
          timeStart: 'Começa',
          timeEnd: 'Termina',
          dateTime: 'Data',
          hourTime: 'Hora',
          place: 'Lugar',
          addEvent: 'Adicionar Evento',
          editEvent: 'Editar Evento'
        }
      }
    }
  }
}

export default pt_br

