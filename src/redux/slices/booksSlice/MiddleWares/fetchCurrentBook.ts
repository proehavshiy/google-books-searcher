import { createAsyncThunk } from '@reduxjs/toolkit';

import constants from '../../../../constants/constants';
import { IBook } from '../../../../types/types';

import { RootState } from '../../../rootReducer';
const { REQUEST_ADRESS, FETCH_ERROR_MESSAGE } = constants;

// типизация createAsyncThunk 
// 1 - что хотим вернуть из функции, 
// 2 - первый параметр async function - параметр при ее вызове 
// 3 - thunkAPIConfig c доп - параметрами типизации
export const fetchCurrentBook = createAsyncThunk<IBook, string, { state: RootState, rejectValue: string }>(
  'books/getCurrentBook',
  async function fetchBook(bookIdForSearch, { getState, rejectWithValue }) {
    // сначала ищем книгу в сторе,
    // если нет, делаем запрос данных для этой конкретной книги по id
    const bookFromState = getState().books.data.find(book => book.id === bookIdForSearch);
    if (bookFromState) {
      return bookFromState;
    } else {
      try {
        const adress = `${REQUEST_ADRESS}/${bookIdForSearch}`;
        const response = await fetch(adress);
        if (!response.ok) {
          return rejectWithValue(FETCH_ERROR_MESSAGE);
        }
        return await response.json();
      } catch {
        return rejectWithValue(FETCH_ERROR_MESSAGE);
      }
    }
  },
);