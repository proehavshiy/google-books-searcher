/* eslint-disable max-len */
import { createAsyncThunk, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { RejectedWithValueActionFromAsyncThunk, UnknownAsyncThunkRejectedWithValueAction } from '@reduxjs/toolkit/dist/matchers';

import { clearBooks } from '../booksSlice';

/* eslint-disable max-len */


import { deleteAndCountDuplicates } from '../../../../utils/deleteAndCountDuplicates';

import constants from '../../../../constants/constants';
import { fetchDataHandler } from '../../../../utils/fetchDataHandler';

import { RootState } from './../../../rootReducer';

import { IBooks, IPreloadedState, IBook } from './../../../../types/types';
import { AppDispatch } from './../../../rootReducer';

const { REQUEST_ADRESS, API_KEY, FETCH_ERROR_MESSAGE } = constants;


// <> 1 - что хотим вернуть из функции, 2 - первый параметр функции 3 - thunkAPIConfig c доп-параметрами типизации
export const fetchBooks = createAsyncThunk<IBooks, boolean, { state: RootState }>(
  'books/fetchBooks',
  async function (requestByForm = true, { getState, dispatch, rejectWithValue }) {
    const {
      pagination: { startIndex, maxResultsIndex },
      searchQuery,
      selectedCategory,
    } = getState().books;

    // если запрос из формы, то очищаем все прошлые запросы,
    // чтобы разные запросы не стакались в стор
    console.log('requestByForm:', requestByForm);
    if (requestByForm) dispatch(clearBooks());

    const categoryQuery = selectedCategory.value === 'all' ? '' : `+subject:${selectedCategory.value}`;
    const intitleQuery = `+intitle:${searchQuery}`;
    const paginationQuery = `&startIndex=${startIndex}&maxResults=${maxResultsIndex}`;

    const adress = `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}${paginationQuery}&key=${API_KEY}`;

    // return fetchDataHandler({
    //   adress,
    //   errorHandler: rejectWithValue,
    //   errorMessage: FETCH_ERROR_MESSAGE,
    // });

    const response = await fetch(adress);
    if (!response.ok) {
      return rejectWithValue(FETCH_ERROR_MESSAGE);
    }
    return await response.json();
  },
);

interface IRawDataFromServer {
  items: IBook[];
  totalItems: number;
}

export const handleFulfilledFetchBooks = (state: IBooks, { payload }: PayloadAction<IBooks>) => {
  console.log('state in fulfilled fetch!!!:', state);
  console.log('payload from fetch!!!:', payload);
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
  console.log('filteredData:', filteredData);

  state.data = filteredData;
  state.pagination.totalItems = payload.totalItems;
  state.pagination.duplicates = state.pagination.duplicates + duplicatesCounter;
  state.pagination.startIndex += state.pagination.maxResultsIndex;
};