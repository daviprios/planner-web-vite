import { DBSchema } from 'idb'

interface BaseEvent {
  name: string,
  description?: string,
  tags?: string[],
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

interface StorageTypes extends DBSchema{
  ReminderEvents: {
    //id, planner equivalent id
    key: number,
    value: ReminderEventData,
    indexes: {
      name: string,
      tags: string,
      timeStart: number,
      place: string
    },
  }
  FinancialEvents: {
    //id, planner equivalent id
    key: number,
    value: FinancialEventData,
    indexes: {
      name: string,
      tags: string,
      timeStart: number,
      moneyAmount: number,
      from: string,
      to: string,
      reason: string,
      type: string
    }
  },
  ListEvents: {
    //id, planner equivalent id
    key: number,
    value: ListEventData,
    indexes: {
      name: string,
      tags: string,
      timeStart: number,
      listCollectionId: number,
    }
  },
  ListCollections: {
    key: number,
    value: ListCollection,
    indexes: {
      name: string,
    }
  },
  TrackerEvents: {
    //id, planner equivalent id
    key: number,
    value: TrackerEventData,
    indexes: {
      name: string,
      tags: string,
      timeStart: number,
      trackerCollectionId: number,
    }
  },
  TrackerCollections: {
    key: number,
    value: TrackerCollection,
    indexes: {
      name: string,
    }
  }
}

export type { StorageTypes, BaseEvent, BaseCollection, ReminderEventData, FinancialEventData, ListEventData, ListCollection, TrackerEventData, TrackerCollection }