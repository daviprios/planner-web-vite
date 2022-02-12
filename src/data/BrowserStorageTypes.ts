import { DBSchema } from 'idb'

type BrowserStorageKeyTypes = number | [number, number]
type BrowserStorageNames = 'PlannerEvents' | 'EventTag' | 'PlannerEventHasEventTag' | 'ReminderEvents' |
  'ReminderEvents' | 'FinancialEvents' | 'ListEvents' | 'ListCollections' |
  'TrackerEvents' | 'TrackerCollections' | 'TrackerCollectionValues' | 'TrackerCollectionsHasTrackerCollectionValue'
type BrowserStorageValueTypes = {
  name: string,
  description?: string,
  eventType: string,
  timeStart: number,
  timeEnd?: number,
  fullDay: boolean,
  createdAt: number,
  updatedAt: number,
} | {
  name: string,
  createdAt: number,
  updatedAt: number,
} | {
  plannerEventId: number,
  eventTagId: number,
} | {
  alarmTime?: number,
  place?: string
} | {
  moneyAmount: number,
  from: string,
  to: string,
  reason?: string,
  type?: string      
} | {
  listCollectionId: number,
  evaluation: string
} | {
  name: string,
  description?: string,
  evaluationType: string
} | {
  tackerCollectionId: number,
  value: string
} | {
  name: string,
  description?: string
} | {
  name: string,
  description?: string,
  color: string,
  symbol?: string
} | {
  trackerCollectionId: number,
  trackerCollectionValueId: number
}
 
interface BrowserStorageTypes extends DBSchema{
  PlannerEvents: {
    key: number,
    value: {
      name: string,
      description?: string,
      eventType: string,
      timeStart: number,
      timeEnd?: number,
      fullDay: boolean,

      createdAt: number,
      updatedAt: number,
    }
  },
  EventTag: {
    key: number,
    value: {
      name: string,

      createdAt: number,
      updatedAt: number,
    }
  },
  PlannerEventHasEventTag: {
    key: number,
    value: {
      plannerEventId: number,
      eventTagId: number,
    }
  },
  ReminderEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: {
      alarmTime?: number,
      place?: string
    }
  }
  FinancialEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: {
      moneyAmount: number,
      from: string,
      to: string,
      reason?: string,
      type?: string      
    }
  },
  ListEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: {
      listCollectionId: number,
      evaluation: string
    }
  },
  ListCollections: {
    key: number,
    value: {
      name: string,
      description?: string,
      evaluationType: string
    }
  },
  TrackerEvents: {
    //id, planner equivalent id
    key: [number, number],
    value: {
      tackerCollectionId: number,
      value: string
    }
  },
  TrackerCollections: {
    key: number,
    value: {
      name: string,
      description?: string
    }
  },
  TrackerCollectionValues: {
    key: number,
    value: {
      name: string,
      description?: string,
      color: string,
      symbol?: string
    }
  },
  TrackerCollectionsHasTrackerCollectionValue: {
    key: number,
    value: {
      trackerCollectionId: number,
      trackerCollectionValueId: number
    }
  }
}

export type { BrowserStorageTypes, BrowserStorageKeyTypes, BrowserStorageValueTypes, BrowserStorageNames }