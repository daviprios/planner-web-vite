import Storage from './BrowserStorage'
import { FinancialEventData, ListCollection, ListEventData, ReminderEventData, TrackerCollection, TrackerEventData } from './BrowserStorageTypes'

const storage = new Storage()

class StorageManagement {
  static createReminder(data: ReminderEventData)
    { storage.create<'ReminderEvents', ReminderEventData>('ReminderEvents', data) }
  static createFinancial(data: FinancialEventData)
    { storage.create<'FinancialEvents', FinancialEventData>('FinancialEvents', data) }
  static createList(data: ListEventData)
    { storage.create<'ListEvents', ListEventData>('ListEvents', data) }
  static createListCollection(data: ListCollection)
    { storage.create<'ListCollections', ListCollection>('ListCollections', data) }
  static createTracker(data: TrackerEventData)
    { storage.create<'TrackerEvents', TrackerEventData>('TrackerEvents', data) }
  static createTrackerCollection(data: TrackerCollection)
    { storage.create<'TrackerCollections', TrackerCollection>('TrackerCollections', data) }
}

export default StorageManagement