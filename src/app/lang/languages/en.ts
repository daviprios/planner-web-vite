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
        addEvent: 'Add Event',
        title: 'Events',
        form: {
          aria_closeButton: 'close add event menu',
          name: 'Name',
          description: 'Description',
          tags: 'Tags',
          tag: 'Tag',
          newTag: 'New Tag',
          addTag: 'Add Tag',
          aria_removeTag: 'remove tag',
          fullDay: 'Full Day',
          timeStart: 'Start At',
          timeEnd: 'End At',
          dateTime: 'Date',
          hourTime: 'Hour',
          place: 'Place',
          addEvent: 'Add Event',
          editEvent: 'Edit Event'
        }
      }
    }
  }
}

export default en