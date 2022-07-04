import { v4 as uuidv4 } from 'uuid';

export class CardsForRendering {
  constructor(array) {
    if (!Array.isArray(array)) return new TypeError('the argument must be an array')

    this._data = [...array].map(card => {
      const {
        id = uuidv4(),
        volumeInfo: {
          title = 'Название недоступно',
          categories = [],
          authors = [],
          publishedDate = new Date(null).toString(),
          imageLinks: {
            thumbnail = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
          }
        }
      } = card

      return {
        image: thumbnail,
        title,
        categories,
        authors,
        publishedDate,
        id,
      }
    })
  }

  get data() {
    return this._data
  }

  sortByParam(param) {
    if (typeof param !== 'string') return new TypeError('sortParam must be a string')
    switch (param) {
      case 'newest':
        this._data.sort(this._sortByNewest)
        return this
      case 'oldest':
        this._data.sort(this._sortByOldest)
        return this
      default:
        return this;
    }
  }

  _sortByNewest(a, b) {
    const dateA = Date.parse(a.publishedDate)
    const dateB = Date.parse(b.publishedDate)
    return dateB - dateA
  }
  _sortByOldest(a, b) {
    const dateA = Date.parse(a.publishedDate)
    const dateB = Date.parse(b.publishedDate)
    return dateA - dateB
  }
}
