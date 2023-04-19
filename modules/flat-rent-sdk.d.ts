export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date
export const backendPort: number
export const localStorageKey: string

export interface Place {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: number[],
  price: number
}

export interface PlaceForSearch {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: number[],
  totalPrice: number
}

interface PlaceListResponse {
  errorMessage?: string
  items: PlaceForSearch[]
}

interface PlaceResponce {
  errorMessage?: string
  item: Place
}

interface SearchFilter {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit?: number;
}

export class FlatRentSdk {
  database: Place[];
  get(id: string): Promise<Place>;
  search(parametrs: SearchFilter): Promise<PlaceForSearch[]>;
  book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<number>
}
