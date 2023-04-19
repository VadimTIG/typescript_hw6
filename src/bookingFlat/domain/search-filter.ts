/**
* Протокол фильтра, с которым должен работать каждый провайдер
*/
export interface SearchFilter {
  city: string,
  checkin: Date,
  checkout: Date,
  maxPrice: number | undefined
}
