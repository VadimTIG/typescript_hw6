import { renderBlock } from './lib.js'
import { getFavoriteItems, getUserData } from './utility/readKeysFromLocalStorage.js';


export function renderUserBlock() {

  const user = getUserData();
  const favoritesItems = getFavoriteItems();
  const favoriteItemsAmount = favoritesItems ? Object.keys(favoritesItems).length : 0;

  const favoritesCaption = favoriteItemsAmount >= 1 ? favoriteItemsAmount.toString() : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount >= 1 ? true : false
  if (user != undefined) {
    renderBlock(
      'user-block',
      `
    <div class="header-container">
      <img class="avatar" src="/${user.avatarUrl}" alt="${user.username}" />
      <div class="info">
          <p class="name">${user.username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
    )
  }
}
