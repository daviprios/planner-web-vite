import { PlannerCollectionProprieties, PlannerEventProprieties } from '$types/Planner'
import PlannerEvent from './PlannerEvent'

abstract class PlannerCollection<PlannerCollectionItem extends PlannerEvent<PlannerEventProprieties>>{
  constructor(
    protected collection: Array<PlannerCollectionItem>,
    protected collectionProprieties: PlannerCollectionProprieties
  ){

  }

  item = {
    push: (item: PlannerCollectionItem) => {
      this.collection.push(item)
    },
    drop: (item: PlannerCollectionItem) => {
      this.collection = this.collection.splice(this.collection.indexOf(item), 1)
    },
    getAll: () => {
      return this.collection
    }
  }
}

export type { PlannerCollectionProprieties }
export default PlannerCollection