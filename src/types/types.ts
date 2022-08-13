interface IPagination {
  totalItems: number | null;
  duplicates: number;
  startIndex: number;
  maxResultsIndex: number;
}

interface ICategory {
  name: string;
  value: string;
  id: number;
}

export interface IBooks {
  data: []; // уточнить
  currentBook: Object; // уточнить
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