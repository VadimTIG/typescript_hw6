
import { Flat } from './bookingFlat/domain/flat.js';
import { renderBlock } from './lib.js'
import { getFavoriteItems } from './utility/readKeysFromLocalStorage.js'


export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderPlaces(places: Flat[]): string {

  const favoritesAmount = getFavoriteItems();

  let placeFindBlocks = '';

  places.forEach(place => {
    const isFavorite = favoritesAmount ? Boolean(favoritesAmount[place.id]) : false;

    placeFindBlocks += `
    <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites${isFavorite ? ' active' : ''}" id='${place.id}'>
            </div>
            <img class="result-img" src='${place.image}' alt="${place.name}">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button data-id='${place.originalId}' data-name='${place.name}' data-provider='${place.isProvidedBy('sdk') ? 'sdk' : 'homy'}'>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
  })
  return placeFindBlocks
}

export function renderSearchResultsBlock(renderPlaces: string): void {

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select name='sorting' id='sorting'>
                <option value='cheap' selected >Сначала дешёвые</option>
                <option value='expensive'>Сначала дорогие</option>
                <option value='nearer'>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id='results-list'>
      ${renderPlaces}
    </ul>
    `
  )
}

