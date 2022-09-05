import { FC } from 'react';
import classNames from 'classnames/bind';

import CardList from '../CardList/CardList';
import Dropdown from '../UI/Dropdown/Dropdown';
import Button from '../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { fetchBooks } from '../../redux/slices/booksSlice/MiddleWares/fetchBooks';
import { CardsForRendering } from '../../utils/CardsForRendering';
import { setSelectedSortOption } from '../../redux/slices/booksSlice/booksSlice';

import styles from './BooksSection.module.scss';
const cn = classNames.bind(styles);

const BooksSection: FC = () => {
  const dispatch = useAppDispatch();

  const {
    data: books,
    sortOptions,
    selectedSortOption,
    pagination: {
      totalItems: totalSearched,
    },
  } = useAppSelector((state) => state.books);

  // фильтруем карточки книжек без фильтрации самого стейта
  const sortedCards = new CardsForRendering(books).sortByParam(selectedSortOption.value).data;

  function loadMoreBooks() {
    dispatch(fetchBooks(false));
  }

  return (
    <div className={cn('books')}>
      {totalSearched !== null
        ? <>
          <div className={cn('control-bar')}>
            <h2 className={cn('counter')}>Найдено: {books.length}</h2>
            {books.length !== 0
              ? <Dropdown
                options={sortOptions}
                currentOption={selectedSortOption}
                handleOption={(selectedOption) => {
                  dispatch(setSelectedSortOption(selectedOption));
                }}
              />
              : null
            }
          </div>
          <div className={cn('content')}>
            <CardList
              cards={sortedCards}
            />
            {(totalSearched && books.length < totalSearched)
              ? <Button
                style={cn('loadMore')}
                text='Загрузить еще'
                handleClick={loadMoreBooks} />
              : null}
          </div>
        </>
        : <div className={cn('initial-placeholder')}>
          Пока нет книг
        </div>
      }
    </div>
  );
};

export default BooksSection;