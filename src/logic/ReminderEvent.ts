import { ReminderEventProprieties } from '@types/Reminder'
import PlannerEvent from './PlannerEvent'

class ReminderEvent extends PlannerEvent<ReminderEventProprieties>{
  constructor(proprieties: ReminderEventProprieties){
    super(proprieties)
  }

}

export default ReminderEvent