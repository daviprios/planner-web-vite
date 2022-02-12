import { openDB, IDBPDatabase, IDBPTransaction, deleteDB } from 'idb'
import { BrowserStorageKeyTypes, BrowserStorageTypes, BrowserStorageValueTypes, BrowserStorageNames } from './BrowserStorageTypes'

const databaseName = 'planner_storage'
const version = 1

type databaseStatus = 'Error' | 'Unitialized' | 'UpgradeNeeded' | 'Connected' | 'Closed'
interface SearchType{
  get: 'FIRST' | 'ALL',
  by: 'VALUE' | 'KEY',
  maximum?: number
}

class BrowserStorage{
  constructor(){
    (async () => await this.connectDatabase())()
  }

  connection: IDBPDatabase<BrowserStorageTypes> | undefined
  databaseStatus: databaseStatus = 'Unitialized'
  private collectionList: {[key in BrowserStorageNames]: BrowserStorageNames} = {
    PlannerEventHasEventTag: 'PlannerEventHasEventTag',
    PlannerEvents: 'PlannerEvents',
    EventTag: 'EventTag',
    ReminderEvents: 'ReminderEvents',
    FinancialEvents: 'FinancialEvents',
    ListCollections: 'ListCollections',
    ListEvents: 'ListEvents',
    TrackerEvents: 'TrackerEvents',
    TrackerCollectionValues: 'TrackerCollectionValues',
    TrackerCollections: 'TrackerCollections',
    TrackerCollectionsHasTrackerCollectionValue: 'TrackerCollectionsHasTrackerCollectionValue',
  }

  private async connectDatabase () {
    try {
      this.connection = await openDB<BrowserStorageTypes>(databaseName, version, {
        upgrade: (
          database: IDBPDatabase<BrowserStorageTypes>,
          oldVersion: number,
          newVersion: number,
          transaction: IDBPTransaction<BrowserStorageTypes,
            ArrayLike<'PlannerEvents' | 'EventTag' | 'PlannerEventHasEventTag' |
            'ReminderEvents' | 'FinancialEvents' | 'ListEvents' | 'ListCollections' |
            'TrackerEvents' | 'TrackerCollections' | 'TrackerCollectionValues' |
            'TrackerCollectionsHasTrackerCollectionValue'>, 'versionchange'>
          ) => {
          console.log(newVersion)
          console.log(transaction)
          switch(oldVersion){
            // Base Initialization
            case undefined:
            case 0:
              this.createCollection(database, this.collectionList.EventTag)
            default:
              break
          }
        },
        blocked: () => {
          return
        },
        blocking: () => {
          return
        },
        terminated: () => {
          return
        }
      })
      this.databaseStatus = 'Connected'
      this.connection.transaction('EventTag')
    }
    catch(error) {
      this.databaseStatus = 'Error'
      console.log(error)
    }
  }

  private deleteDatabase (): boolean {
    if(this.databaseStatus !== 'Connected')
      return false

    deleteDB(databaseName)
    return true
  }

  private closeDatabase (): boolean {
    if(this.connection === undefined ||
      this.databaseStatus !== 'Connected')
      return false
      
    this.connection.close()
    this.databaseStatus = 'Closed'
    return true
  }

  private createCollection (database: IDBPDatabase<BrowserStorageTypes>, collection: BrowserStorageNames): boolean {
    if(this.databaseStatus !== 'Unitialized' ||
      (this.connection !== undefined &&
      this.connection.objectStoreNames.contains(collection)))
      return false

    database.createObjectStore(collection, { keyPath: 'id', autoIncrement: true })
    
    return true
  }

  public async create (
    table: BrowserStorageNames,
    data: BrowserStorageValueTypes
  ): Promise<boolean> {

    if(this.connection === undefined ||
       this.databaseStatus !== 'Connected')
       return false
    
    const res = await this.connection.add(table, data)
    console.log(res)
    
    return true
  }

  public async read (
    table: BrowserStorageNames,
    search: IDBKeyRange | BrowserStorageKeyTypes | undefined,
    searchType: SearchType
  ): Promise<BrowserStorageValueTypes[] | BrowserStorageKeyTypes[] | [BrowserStorageKeyTypes | BrowserStorageValueTypes | undefined]> {

    if(this.connection === undefined ||
      this.databaseStatus !== 'Connected')
      return []

    let readResult:
      BrowserStorageValueTypes[] |
      BrowserStorageKeyTypes[] |
      [BrowserStorageKeyTypes | BrowserStorageValueTypes | undefined]
      = []
      
    try{
      if(searchType.get === 'ALL' || searchType.by === 'KEY')
        readResult = await this.connection.getAllKeys(table, search, searchType.maximum)
      if(searchType.get === 'ALL' || searchType.by === 'VALUE')
        readResult = await this.connection.getAll(table, search, searchType.maximum)
      if(searchType.get === 'FIRST'){
        if(search === undefined) return []
        if(searchType.by === 'KEY')
          readResult = [await this.connection.getKey(table, search)]
        if(searchType.by === 'VALUE')
          readResult = [await this.connection.get(table, search)]
      }
    }
    catch(error){
      console.log(error)
    }

    return readResult
  }

  public async update (
    table: BrowserStorageNames,
    data: BrowserStorageValueTypes,
    search: IDBKeyRange | BrowserStorageKeyTypes
  ): Promise<boolean> {

    if(this.connection === undefined ||
      this.databaseStatus !== 'Connected')
      return false

    const key = await this.connection.getKey(table, search)

    if(key === undefined)
      return false

    await this.connection.put(table, data, key)

    return true
  }
  
  public async delete (
    table: BrowserStorageNames,
    search: IDBKeyRange | BrowserStorageKeyTypes
  ): Promise<boolean> {

    if(this.connection === undefined ||
      this.databaseStatus !== 'Connected')
      return false

    const key = await this.connection.getKey(table, search)

    if(key === undefined)
      return false

    await this.connection.delete(table, key)

    return true
  }
}

export default BrowserStorage