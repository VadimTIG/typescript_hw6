import { renderBlock } from './lib.js'

function getDateForInput(date: Date | string, shiftByDays?: number | 'lastDay',
  shiftByMonths?: number): string {
  let newDate: Date;
  if (typeof (date) !== 'string') {
    newDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1 + (shiftByMonths ? shiftByMonths : 0),
      shiftByDays === 'lastDay' ? 0 : date.getDate() + (shiftByDays ? shiftByDays : 0));
  } else {
    const dateArray = date.split('-');
    newDate = new Date(
      Number(dateArray[0]),
      Number(dateArray[1]) + (shiftByMonths ? shiftByMonths : 0),
      shiftByDays === 'lastDay' ? 0 : Number(dateArray[2]) + (shiftByDays ? shiftByDays : 0));
  }
  const YYYY = newDate.getFullYear();
  const MM = newDate.getMonth();
  const DD = newDate.getDate();
  return `${YYYY}-${MM < 10 ? 0 : ''}${MM}-${DD < 10 ? 0 : ''}${DD}`
}


export function renderSearchFormBlock(checkin?: Date, checkout?: Date) {
  const max = getDateForInput(new Date(), 'lastDay', 2);
  const min = getDateForInput(new Date());
  const dayStart = checkin ? getDateForInput(checkin) : getDateForInput(new Date(), 1);
  const dayFinish = checkout ? getDateForInput(checkout) : getDateForInput(dayStart, 2);

  renderBlock(
    'search-form-block',
    `
    <form id='search-form'>
      <fieldset class="search-filedset">
        <div class="row">
          <div id='place'>
            <label for="city">Город</label>
            <input id="city" type="text" name='city'  value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="sdk" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row" id='searchFormDate'>
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${dayStart}" min="${min}" max="${max}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${dayFinish}" min="${min}" max="${max}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="4500" name="price" class="max-price" />
          </div>
          <div>
            <div><button type='submit'>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}


