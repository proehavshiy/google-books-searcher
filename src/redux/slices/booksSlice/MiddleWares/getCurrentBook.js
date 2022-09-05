import { createAsyncThunk } from '@reduxjs/toolkit';

import constants from '../../../../constants/constants';
import { fetchDataHandler } from '../../../../utils/fetchDataHandler';
const { REQUEST_ADRESS, FETCH_ERROR_MESSAGE } = constants;

export const getCurrentBook = createAsyncThunk(
  'books/getCurrentBook',
  async function fetchBook(bookIdForSearch, { getState, rejectWithValue }) {
    // сначала ищем книгу в сторе,
    // если нет, делаем запрос данных для этой конкретной книги по id
    const bookFromState = getState().books.data.find(book => book.id === bookIdForSearch);
    if (bookFromState) {
      return bookFromState;
    } else {
      const adress = `${REQUEST_ADRESS}/${bookIdForSearch}`;
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
    }
  }
);

export const handleFulfilledGetCurrentBook = (state, { payload }) => {
  state.isFetchDone = true;
  state.currentBook = payload;
};