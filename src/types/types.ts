import { PayloadAction } from '@reduxjs/toolkit';

// интерфейс ответа сервера на запрос книжек
export interface IFetchBooksRequest {
  items: IBook[],
  kind: string;
  totalItems: number;
}

// интерфейс книжки с сервера
export interface IBook {
  accessInfo: {
    accessViewStatus: string;
    country: string;
    embeddable: boolean;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    publicDomain: boolean;
    quoteSharingAllowed: false;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
  };
  etag: string;
  id: string;
  kind: string;
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: string;
  };
  searchInfo: {
    textSnippet: string;
  }
  selfLink: string;
  volumeInfo: {
    allowAnonLogging: boolean;
    authors: string[];
    canonicalVolumeLink: string;
    categories: string[];
    contentVersion: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    industryIdentifiers: { type: string; identifier: string; }[];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    readingModes: {
      image: boolean;
      text: false;
    };
    subtitle: string;
    title: string;
  }
}

// интерфейсы стора для книжек, когда запрос от сервера обработан
interface IPagination {
  totalItems: number | null;
  duplicates: number;
  startIndex: number;
  maxResultsIndex: number;
}

export interface ICategory {
  name: string;
  value: string;
  id: number;
}

export interface IBooks {
  [x: string]: any;
  data: IBook[];
  currentBook: IBook | {};
  pagination: IPagination;
  isFetchDone: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: ICategory;
  selectedSortOption: ICategory;
  categories: ICategory[];
  sortOptions: ICategory[];
}

export interface IPreloadedState {
  books: IBooks;
}

// алиас для редюсеров
export type Reducer<T, K = void> = (state: T, action: PayloadAction<K>) => T | void;


export interface ICardForRendering {
  image: string;
  title: string;
  categories: string[];
  authors: string[];
  publishedDate: string;
  id: string;
}


