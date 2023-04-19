import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { createLocalStorage } from './utility/createLocalStorage.js'
import { getUserData } from './utility/readKeysFromLocalStorage.js'
import { handleSearchFormSubmit } from './utility/handlers.js'


window.addEventListener('DOMContentLoaded', () => {
  createLocalStorage({ user: { username: 'Wade Warren', avatarUrl: 'img/avatar.png' }, favoritesAmount: 2 })
  const user = getUserData();

  if (user) {
    renderUserBlock()
  }
  renderSearchFormBlock()
  const searchForm = document.getElementById('search-form') as HTMLFormElement
  searchForm.addEventListener('submit', handleSearchFormSubmit);
  renderSearchStubBlock()
  // renderSearchResultsBlock()
  // renderToast(
  //     { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
  //     { name: 'Понял', handler: () => { console.log('Уведомление закрыто') } }
  // )
  // })
})




