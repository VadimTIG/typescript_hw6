import { Flat } from './flat.js'
import { SearchFilter } from './search-filter.js'

export interface Provider {
  find(filter: SearchFilter): Promise<Flat[]>
  getById(id: string): Promise<Flat>
  book(id: string, checkin: Date, checkout: Date): Promise<number>
}





