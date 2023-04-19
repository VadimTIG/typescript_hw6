
import { BookFilter } from '../../domain/book-filter.js'
import { Flat } from '../../domain/flat.js'
import { Provider } from '../../domain/providers.js'
import { SearchFilter } from '../../domain/search-filter.js'
import { HttpHelper } from '../../utils/http-helper.js'
import { Flat as HomyFlat } from './response.js'

export class HomyProvider implements Provider {

  // имя провайдера нужно, чтобы было возможно установить источник квартиры
  public static provider = 'homy'
  private static apiUrl = 'http://localhost:3030'
  public find(filter: SearchFilter): Promise<Flat[]> {
    return HttpHelper.fetchAsJson<HomyFlat[]>(
      HomyProvider.apiUrl + '/places?' +
      // создадим соответствующую строку запроса из объекта фильтра
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {
        // сконвертируем JSON-ответ в экземпляры Flat
        return this.convertFlatListResponse(response)
      })
  }


  public getById(id: string): Promise<Flat> {
    // console.log(id);
    return HttpHelper.fetchAsJson<HomyFlat>(HomyProvider.apiUrl + '/places/' +
      id)
      .then((response) => {
        // сконвертируем JSON-ответ в экземпляр Book
        return this.convertFlatResponse(response)
      })

  }

  public async book(id: string, checkin: Date, checkout: Date) {
    const flat = await this.getById(id)
    // console.log('homy-provider => book', flat)
    const originId = flat.originalId
    return HttpHelper.fetchAsNumber(
      HomyProvider.apiUrl + '/places/' +
      // создадим соответствующую строку запроса из объекта фильтра
      this.convertBookFilterToQueryString({
        id: originId,
        checkin: checkin,
        checkout: checkout
      }), { method: 'PATCH' }
    )
      .then(response => {
        // console.log('homy-provider => book =>', response)
        return response
      })

  }

  private dateToUnixStamp(date: Date): number {
    return date.getTime()
  }

  /**
* Необходимо написать логику преобразования общего фильтра
* в get-параметры текущего источника
*/
  private convertFilterToQueryString(filter: SearchFilter): string {
    let url = `checkInDate=${this.dateToUnixStamp(filter.checkin)}&` +
      `checkOutDate=${this.dateToUnixStamp(filter.checkout)}&` +
      'coordinates=59.9386,30.3141'

    if (filter.maxPrice != null) {
      url += `&maxPrice=${filter.maxPrice}`
    }
    return url
  }

  private convertBookFilterToQueryString(filter: BookFilter): string {
    const url = `${filter.id}?` +
      `checkInDate=${this.dateToUnixStamp(filter.checkin)}&` +
      `checkOutDate=${this.dateToUnixStamp(filter.checkout)}&`
    return url
  }

  /**
* Проходимся по каждому объекту и конвертируем его в экземпляр Flat
*/
  private convertFlatListResponse(response: HomyFlat[]): Flat[] {
    // console.log('convertFlatListResponse => Homy =>', response);
    return response.map((item) => {
      return this.convertFlatResponse(item)
    })
  }

  /**
  * Здесь находится логика преобразования объекта книги из источника
  * в экземпляр Flat нашего приложения
  */
  private convertFlatResponse(item: HomyFlat): Flat {
    return new Flat(
      HomyProvider.provider,
      String(item.id),
      item.image,
      item.name,
      item.description,
      item.price,
      item.remoteness,
      item.bookedDates,
    )
  }
}
