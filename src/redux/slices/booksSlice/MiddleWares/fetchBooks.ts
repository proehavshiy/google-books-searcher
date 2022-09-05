import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearBooks } from '../booksSlice';

import constants from '../../../../constants/constants';

import { RootState } from './../../../rootReducer';
import { IFetchBooksRequest } from './../../../../types/types';

const { REQUEST_ADRESS, API_KEY, FETCH_ERROR_MESSAGE } = constants;

// типизация createAsyncThunk 
// 1 - что хотим вернуть из функции, 
// 2 - первый параметр async function - параметр при ее вызове 
// 3 - thunkAPIConfig c доп - параметрами типизации
export const fetchBooks = createAsyncThunk<
  { responseData: IFetchBooksRequest, isRequestByForm: boolean },
  boolean,
  { state: RootState, rejectValue: string }
>(
  'books/fetchBooks',
  async function (isRequestByForm = true, { getState, dispatch, rejectWithValue }) {
    const {
      pagination: { startIndex, maxResultsIndex },
      searchQuery,
      selectedCategory,
    } = getState().books;

    // если запрос из формы, то очищаем все прошлые запросы,
    // чтобы разные запросы не стакались в стор
    if (isRequestByForm) dispatch(clearBooks());

    const categoryQuery = selectedCategory.value === 'all' ? '' : `+subject:${selectedCategory.value}`;
    const intitleQuery = `+intitle:${searchQuery}`;
    const paginationQuery = `&startIndex=${startIndex}&maxResults=${maxResultsIndex}`;

    const adress = `${REQUEST_ADRESS}?q=${intitleQuery}${categoryQuery}${paginationQuery}&key=${API_KEY}`;

    try {
      const response = await fetch(adress);
      if (!response.ok) {
        return rejectWithValue(FETCH_ERROR_MESSAGE);
      }
      const responseData = await response.json();
      return {
        isRequestByForm,
        responseData,
      };
    } catch {
      return rejectWithValue(FETCH_ERROR_MESSAGE);
    }
  },
);