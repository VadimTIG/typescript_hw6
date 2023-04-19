import { User } from '../types';

export function getUserData(): User | undefined {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (typeof user.username === 'string' && typeof user.avatarUrl === 'string') {
        return user;
      }
    } catch { console.warn('No user data found in localStorage'); }
  }
  return undefined;
}


export function getFavoriteItems() {
  const favoriteItems = localStorage.getItem('favoriteItems');
  if (favoriteItems) {
    try {
      const favoriteItem = JSON.parse(favoriteItems);
      return favoriteItem;
    } catch { console.warn('No favoriteItems data found in localStorage'); }
  }
  return undefined;
}
