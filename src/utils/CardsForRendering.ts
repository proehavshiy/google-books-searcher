import { v4 as uuidv4 } from 'uuid';

import constants from '../constants/constants';

import { IBook, ICardForRendering } from './../types/types';
const { IMG_PLACEHOLDER, TITLE_PLACEHOLDER } = constants;

export class CardsForRendering {
  _data: ICardForRendering[];

  constructor(array: IBook[]) {
    this._data = [...array].map(card => {
      const {
        id = uuidv4(),
        volumeInfo: {
          title = TITLE_PLACEHOLDER,
          categories = [],
          authors = [],
          publishedDate = new Date(0).toString(),
          imageLinks: {
            thumbnail = IMG_PLACEHOLDER,
          } = {
            thumbnail: IMG_PLACEHOLDER,
          },
        } = {},
      } = card;

      return {
        image: thumbnail,
        title,
        categories,
        authors,
        publishedDate,
        id,
      };
    });
  }
  get data() {
    return this._data;
  }
  sortByParam(param: string) {
    switch (param) {
    case 'newest':
      this._data.sort(this._sortByNewest);
      return this;
    case 'oldest':
      this._data.sort(this._sortByOldest);
      return this;
    default:
      return this;
    }
  }
  _sortByNewest(a: ICardForRendering, b: ICardForRendering) {
    const dateA = Date.parse(a.publishedDate);
    const dateB = Date.parse(b.publishedDate);
    return dateB - dateA;
  }
  _sortByOldest(a: ICardForRendering, b: ICardForRendering) {
    const dateA = Date.parse(a.publishedDate);
    const dateB = Date.parse(b.publishedDate);
    return dateA - dateB;
  }
}
