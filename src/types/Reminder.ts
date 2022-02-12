import { PlannerCollectionProprieties, PlannerEventProprieties } from './Planner'

interface ReminderCollectionProprieties extends PlannerCollectionProprieties{
  s: number
}

interface ReminderEventProprieties extends PlannerEventProprieties{
  alarmTime: Date
}

export type { ReminderCollectionProprieties, ReminderEventProprieties }