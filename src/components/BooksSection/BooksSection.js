import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '../UI/Dropdown/Dropdown';
import CardList from '../CardList/CardList';
import Button from '../UI/Button/Button';
import { fetchBooks } from '../../redux/slices/booksSlice/MiddleWares/fetchBooks';
import { CardsForRendering } from '../../utils/CardsForRendering';

import styles from './BooksSection.module.scss';
const cn = classNames.bind(styles);

function BooksSection() {
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const dispatch = useDispatch();

  const {
    data: books,
    sortOptions,
    pagination: {
      totalItems: totalSearched,
      duplicates,
    },
  } = useSelector((state) => state.books);

  // фильтруем карточки книжек без фильтрации самого стейта
  const sortedCards = new CardsForRendering(books).sortByParam(selectedSortOption).data;

  function loadMoreBooks() {
    dispatch(fetchBooks(false));
  }

  return (
    <div className={cn('books')}>
      {totalSearched !== null
        ? <>
          <div className={cn('control-bar')}>
            <h2 className={cn('counter')}>Найдено: {totalSearched}</h2>
            {books.length !== 0
              ? <Dropdown
                options={sortOptions}
                handleOption={setSelectedSortOption}
              />
              : null
            }
          </div>
          <div className={cn('content')}>
            <CardList
              cards={sortedCards}
            />
            {(totalSearched && books.length < totalSearched - duplicates)
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
}

export default BooksSection;