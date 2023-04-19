import { Flat } from '../bookingFlat/domain/flat'

export function sorting(index: string, array: Array<Flat> = []): Array<Flat> {
  switch (index) {
  case 'cheap':
    return array.sort(sortByPriceCheapFirst)
  case 'expensive':
    return array.sort(sortByPriceExpensiveFirst)
  case 'nearer':
    return array.sort(sortByRemotenessNearerFirst)
  default:
    return array
  }

}


function sortByPriceCheapFirst(one: Flat, two: Flat) {
  if (one.price > two.price) {
    return 1
  } else if (one.price < two.price) {
    return -1
  } else {
    return 0
  }
}

function sortByPriceExpensiveFirst(one: Flat, two: Flat) {
  if (one.price > two.price) {
    return -1
  } else if (one.price < two.price) {
    return 1
  } else {
    return 0
  }
}

function sortByRemotenessNearerFirst(one: Flat, two: Flat) {
  if (one.remoteness > two.remoteness) {
    return 1
  } else if (one.remoteness < two.remoteness) {
    return -1
  } else {
    return 0
  }
}
