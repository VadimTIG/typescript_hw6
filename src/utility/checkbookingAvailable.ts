import { renderSearchStubBlock } from '../search-results.js';
import { renderToast } from '../lib.js';

export function checkBookingAvailability(selectedDate: Date) {

  const interval = setInterval(() => {
    const realTime = new Date().getTime();
    const between = realTime - selectedDate.getTime();
    if (between > 300000) {
      renderToast({ text: 'Please update your search data', type: 'success' },
        { name: 'Update', handler: () => { renderSearchStubBlock() } })
      clearInterval(interval);
    }
    document.addEventListener('click', (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const btn = event.target as HTMLButtonElement
        if (btn.dataset['id']) clearInterval(interval);
      }
    })
  }, 1000);
}
