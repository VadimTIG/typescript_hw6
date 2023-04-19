import { getFavoriteItems } from './readKeysFromLocalStorage.js';
import { Keys, Property } from '../types.js'

export function createLocalStorage(keys: Keys): void {
  if (!localStorage.getItem('user') || !localStorage.getItem('favoritesAmount')) {
    localStorage.setItem('user', JSON.stringify(keys.user));
    localStorage.setItem('favoritesAmount', keys.favoritesAmount.toString());
    console.log('Local Storage created!')
  } else console.log('Local Storage already exists!')
}


export function toggleFavoriteItem(property: Property): void {
  const favoriteItems = getFavoriteItems() || {};
  const isFavorite = favoriteItems ? Boolean(favoriteItems[property.id]) : false;

  if (isFavorite) {
    delete favoriteItems[property.id];
  } else {
    if (!favoriteItems[property.id]) {
      favoriteItems[property.id] = {};
    }
    favoriteItems[property.id].id = property.id;
    favoriteItems[property.id].name = property.name;
    favoriteItems[property.id].image = property.image;
  }
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
}
