import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearBooks } from '../booksSlice';

import { deleteAndCountDuplicates } from '../../../../utils/deleteAndCountDuplicates';

import constants from '../../../../constants/constants';
import { fetchDataHandler } from '../../../../utils/fetchDataHandler';
const { REQUEST_ADRESS, API_KEY, FETCH_ERROR_MESSAGE } = constants;

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async function (requestByForm = true, { getState, rejectWithValue, dispatch }) {
    const {
      pagination: { startIndex, maxResultsIndex },
      searchQuery,
      selectedCategory,
    } = getState().books;

    // если запрос из формы, то очищаем все прошлые запросы,
    // чтобы разные запросы не стакались в стор
    if (requestByForm) dispatch(clearBooks());

    const categoryQuery = selectedCategory === 'all' ? '' : `+subject:${selectedCategory}`;
    const intitleQuery = `+intitle:${searchQuery}`;
    const paginationQuery = `&startIndex=${startIndex}&maxResults=${maxResultsIndex}`;

    const adress = `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}${paginationQuery}&key=${API_KEY}`;

    return fetchDataHandler({
      adress,
      errorHandler: rejectWithValue,
      errorMessage: FETCH_ERROR_MESSAGE,
    });
  }
);

export const handleFulfilledFetchBooks = (state, { payload }) => {
  state.isFetchDone = true;

  // тк api возвращает дубликаты (на форуме пишут об этом с 19 года), 
  // то приходится фильтровать каждый запрос
  // всего реальных книг будет чуть меньше, чем заявлено в totalItems
  // я не корректирую totalItems с каждым запросом пагинации,
  // потому что это будет странно с точки зрения UX, у пользователя будут вопросы. А так он и не заметит разницы.

  // когда не пришли данные совсем
  if (!payload.items) {
    // подставлыем пустой мок, чтобы избежать ошибки
    payload.items = [];
    payload.totalItems = 0;
  }
  const filterBooks = deleteAndCountDuplicates();
  const { filteredData, duplicatesCounter } = filterBooks(state.data, payload.items);

  state.data = filteredData;
  state.pagination.totalItems = payload.totalItems;
  state.pagination.duplicates = state.pagination.duplicates + duplicatesCounter;
  state.pagination.startIndex += state.pagination.maxResultsIndex;
};