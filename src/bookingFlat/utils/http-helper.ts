export abstract class HttpHelper {
  /**
  * Метод выполняет запрос и преобразует ответ в JSON
  * Тип ответа будет взять из дженерик параметра Response
  */
  public static fetchAsJson<Response>(input: RequestInfo, init?: RequestInit):
    Promise<Response> {
    return fetch(input, init)
      .then((response) => {
        return response.text()
      })
      .then<Response>((responseText) => {
        return JSON.parse(responseText)
      })
  }

  public static fetchAsNumber(input: RequestInfo, init?: RequestInit): Promise<number> {
    return fetch(input, init)
      .then(response => {
        if (response.status == 200) {
          const min = 1000
          const max = 9999
          const num = Math.random() * (max - min) + min
          return Math.floor(num)
        } else return 400
      })
  }

}
