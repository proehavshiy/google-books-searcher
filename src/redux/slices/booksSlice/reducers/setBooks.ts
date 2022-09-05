import { IBooks, IFetchBooksRequest } from '../../../../types/types';
import { deleteAndCountDuplicates } from '../../../../utils/deleteAndCountDuplicates';

import { Reducer } from './../../../../types/types';

interface IPayload {
  responseData: IFetchBooksRequest;
  isRequestByForm: boolean;
};

export const setBooksReducer: Reducer<IBooks, IPayload> = (state, { payload }) => {
  state.isFetchDone = true;

  const { responseData: { totalItems = 0, items = [] }, isRequestByForm } = payload;

  // тк api возвращает дубликаты (на форуме пишут об этом с 19 года), 
  // то приходится фильтровать каждый запрос и удалять дубли из стора и из новой партии книжек
  // всего реальных книг будет чуть меньше, чем заявлено в totalItems
  // я не корректирую totalItems с каждым запросом пагинации,
  // потому что это будет странно с точки зрения UX, у пользователя будут вопросы. А так он и не заметит разницы.
  const filterBooks = deleteAndCountDuplicates();
  const { filteredData, duplicatesCounter } = filterBooks(state.data, items);

  state.data = filteredData;

  if (isRequestByForm) {
    state.pagination.totalItems = totalItems;
    state.pagination.startIndex = 0;
    state.pagination.duplicates = 0;
  } else {
    if (state.pagination.totalItems) state.pagination.totalItems -= duplicatesCounter;
    state.pagination.startIndex += state.pagination.maxResultsIndex;
    state.pagination.duplicates += duplicatesCounter;
  }
};