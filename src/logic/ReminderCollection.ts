import { ReminderCollectionProprieties } from '$types/Reminder'
import PlannerCollection from './PlannerCollection'
import ReminderEvent from './ReminderEvent'

class ReminderCollection extends PlannerCollection<ReminderEvent>{
  constructor(
    reminderCollection: Array<ReminderEvent>,
    reminderProprieties: ReminderCollectionProprieties
  ){
    super(reminderCollection, reminderProprieties)
  }
}

export default ReminderCollection