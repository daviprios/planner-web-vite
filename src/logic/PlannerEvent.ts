import { PlannerEventProprieties } from '@types/Planner'

abstract class PlannerEvent<Proprieties extends PlannerEventProprieties>{
  constructor(
    protected proprieties: Proprieties
  ){

  }
}

export type { PlannerEventProprieties }
export default PlannerEvent