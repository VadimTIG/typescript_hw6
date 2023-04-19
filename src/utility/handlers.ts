// import { book, search } from "../search-API.js";
import { renderBlock } from '../lib.js';
import { Property } from '../types.js';
import { renderEmptyOrErrorSearchBlock, renderSearchResultsBlock, renderSearchStubBlock, renderPlaces } from '../search-results.js';
import { renderUserBlock } from '../user.js'
import { toggleFavoriteItem } from './createLocalStorage.js'
import { renderToast } from '../lib.js';
import { SearchFilter } from '../bookingFlat/domain/search-filter.js';
import { HomyProvider } from '../bookingFlat/providers/homy/homy-provider.js';
import { SDKProvider } from '../bookingFlat/providers/sdk/sdk-provider.js';
import { Flat } from '../bookingFlat/domain/flat.js';
import { sorting } from './sorting.js';
import { checkBookingAvailability } from './checkbookingAvailable.js';

export function handlerToggleFavoriteItem(event: Event) {
  event.preventDefault();

  const div = event.target as HTMLDivElement;
  div.classList.toggle('active');
  const img = div.nextElementSibling as HTMLImageElement
  const src = img.getAttribute('src') || ''
  const alt = img.getAttribute('alt') || ''
  const property: Property = {
    id: div.id,
    image: src,
    name: alt
  }
  toggleFavoriteItem(property);
  renderUserBlock();
}

export async function handlerBookingPlace(event: Event) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  const checkin = document.getElementById('check-in-date') as HTMLDataElement;
  const checkout = document.getElementById('check-out-date') as HTMLDataElement;
  const originalId = button.dataset['id'] || '';
  const provider = button.dataset['provider'] || '';
  let TransactionId: number;
  try {
    if (provider === 'homy') {
      const homy = new HomyProvider()
      TransactionId = await homy.book(originalId, new Date(checkin.value), new Date(checkout.value));
    } else {
      const sdk = new SDKProvider()
      TransactionId = await sdk.book(originalId, new Date(checkin.value), new Date(checkout.value));
    }
    if (TransactionId >= 1000 && TransactionId <= 9999) {
      renderToast(
        { text: 'Бронирование прошло успешно', type: 'success' }
      )
      renderSearchStubBlock()
    } else renderToast(
      { text: 'Не возможно забронировать на выбранные даты', type: 'unsuccess' }
    )
  } catch (error) {
    console.error(error);
    renderToast(
      { text: 'В системе произошла ошибка. Попробуйте еще раз', type: 'unsuccess' }
    )
  }
}


function setHandlers(array: Array<Flat>) {
  const favorites = document.getElementsByClassName('favorites') as HTMLCollectionOf<HTMLDivElement>
  const buttons = document.querySelectorAll('.result-info--footer button') as NodeListOf<HTMLButtonElement>
  const selectSort = document.getElementById('sorting') as HTMLSelectElement

  for (const favorite of favorites) {
    favorite.addEventListener('click', (event) => handlerToggleFavoriteItem(event))
  }
  for (const button of buttons) {
    button.addEventListener('click', (event) => handlerBookingPlace(event))
  }
  selectSort.addEventListener('input', (event) => {
    handlerSortingSelect(event, array)
  })
}

function handlerSortingSelect(event: Event, array: Array<Flat>) {
  const select = event.target as HTMLSelectElement
  const selectedValue = select.value
  const sortFlat = sorting(selectedValue, array);
  renderBlock('results-list', renderPlaces(sortFlat));
  setHandlers(sortFlat)
}



function ArrayForPromiseConstructor(providers: string[], filter: SearchFilter): Array<Promise<Flat[]>> {
  if (providers.length != 0) {
    const promiseArray: Array<Promise<Flat[]>> = [];
    providers.forEach(provider => {
      if (provider == 'homy') {
        const homy = new HomyProvider()
        promiseArray[promiseArray.length] = homy.find(filter)
      }
      if (provider == 'sdk') {
        const sdk = new SDKProvider()
        promiseArray[promiseArray.length] = sdk.find(filter)
      }
    })
    return promiseArray
  } return []
}

export function handleSearchFormSubmit(event: Event) {
  event.preventDefault(); // предотвращаем отправку формы на сервер
  renderSearchStubBlock();

  const form = event.target as HTMLFormElement;
  const selectedValue = 'cheap'
  const formData = new FormData(form);
  const providers = formData.getAll('provider') as string[]
  // console.log('providers:', providers)
  const filter: SearchFilter = {
    city: formData.get('city') as string,
    checkin: new Date(formData.get('checkin') as string),
    checkout: new Date(formData.get('checkout') as string),
    maxPrice: Number(formData.get('price')) || undefined,
  };

  Promise.all(ArrayForPromiseConstructor(providers, filter)).then((results) => {
    // const countProvider = Math.min(ArrayForPromiseConstructor(providers, filter).length, results?.length ?? 0);
    const countProvider = ArrayForPromiseConstructor(providers, filter).length
    let allResults: Array<Flat> = [];
    if (results && results.length > 0) {
      allResults = [...allResults, ...results.slice(0, countProvider).flat()];

      if (allResults.length > 0) {
        renderSearchResultsBlock(renderPlaces(sorting(selectedValue, allResults)));
        setHandlers(allResults);
      } else {
        renderEmptyOrErrorSearchBlock('К сожалению, по вашим критериям поиска ничего не удалось найти')
      }
    } else {
      renderEmptyOrErrorSearchBlock('К сожалению, по вашим критериям поиска ничего не удалось найти')
    }
  })
    .catch(error => {
      renderEmptyOrErrorSearchBlock('К сожалению, произошла ошибка');
      console.error(error)
    })


  checkBookingAvailability(new Date());
}



