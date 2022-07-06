import React, { useEffect, useState } from 'react';

// styles
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from '../UI/Dropdown/Dropdown';
import CardList from '../CardList/CardList';
import { fetchBooks } from '../../redux/slices/booksSlice/booksSlice';
import { CardsForRendering } from '../../utils/CardsForRendering';
import Button from '../UI/Button/Button';

import styles from './BooksSection.module.scss';
// constants

const cn = classNames.bind(styles);

function BooksSection() {
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.data);
  const sortOptions = useSelector((state) => state.books.sortOptions);
  const isFetchDone = useSelector((state) => state.books.isFetchDone);
  const totalSearched = useSelector((state) => state.books.pagination.totalItems);
  const duplicates = useSelector((state) => state.books.pagination.duplicates);
  const sortedCards = new CardsForRendering(books).sortByParam(selectedSortOption).data;


  function loadMoreBooks() {
    dispatch(fetchBooks(false));
  }


  return (
    <div className={cn('books')}>
      <div className={cn('books__control-bar')}>
        {totalSearched !== null
          ? <h1>Найдено: {totalSearched}</h1>
          : null
        }
        {totalSearched !== 0
          ? <Dropdown
            options={sortOptions}
            handleOption={setSelectedSortOption}
          />
          : null
        }

      </div>
      {!isFetchDone && <p>LOADING...</p>}
      <div className={cn('books__content')}>
        {books.length
          ?
          <CardList
            cards={sortedCards}
          />
          : null
        }
        {
          (totalSearched && books.length < totalSearched - duplicates)
            ? <Button
              style={cn('books__loadMore')}
              text='Еще'
              handleClick={loadMoreBooks}
            />
            : null
        }
      </div>

    </div>
  );
}

export default BooksSection;