import { DBSchema } from 'idb'

type BrowserStorageKeyTypes = number | [number, number]
type BrowserStorageNames = 'ReminderEvents' | 'FinancialEvents' | 'ListEvents' | 'ListCollections' | 'TrackerEvents' | 'TrackerCollections'

interface BaseEvent {
  name: string,
  description?: string,
  eventType: string,
  tags: string[],
  timeStart: number,
  timeEnd?: number,
  fullDay: boolean,
  createdAt: number,
  updatedAt: number,
}

interface ReminderEventData extends BaseEvent {
  alarmTime?: number,
  place?: string
}

interface FinancialEventData extends BaseEvent {
  moneyAmount: number,
  from: string,
  to: string,
  reason?: string,
  type?: string      
}

interface ListEventData extends BaseEvent {
  listCollectionId: number,
  evaluation: string
}

interface TrackerEventData extends BaseEvent {
  tackerCollectionId: number,
  value: string
}

interface BaseCollection{
  name: string,
  description?: string,
}

interface ListCollection extends BaseCollection {
  evaluationType: string
}

interface TrackerCollection extends BaseCollection {
  values: {
    name: string,
    description?: string,
    color: string,
    symbol?: string 
  }[]
}

interface BrowserStorageTypes extends DBSchema{
  ReminderEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: ReminderEventData
  }
  FinancialEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: FinancialEventData
  },
  ListEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: ListEventData
  },
  ListCollections: {
    key: number,
    value: ListCollection
  },
  TrackerEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: TrackerEventData
  },
  TrackerCollections: {
    key: number,
    value: TrackerCollection
  }
}

export type { BrowserStorageTypes, BrowserStorageKeyTypes, BrowserStorageNames,
  BaseEvent, BaseCollection, ReminderEventData, FinancialEventData, ListEventData, ListCollection, TrackerEventData, TrackerCollection }