interface PlannerEventProprieties{
  name: string,
  description: string,
  timeStart: Date,
  timeEnd?: Date
}

interface PlannerCollectionProprieties{
  name: string,
  description: string
}

export type { PlannerEventProprieties, PlannerCollectionProprieties }