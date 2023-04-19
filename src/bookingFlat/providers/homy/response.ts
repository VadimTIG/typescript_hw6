
/**
* Структура самой квартиры
*/
export interface Flat {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

