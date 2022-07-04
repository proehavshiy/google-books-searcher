import React, { useEffect, useState } from 'react';
// styles
import styles from './BooksSection.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../UI/Dropdown/Dropdown';
import CardList from '../CardList/CardList';
import { fetchBooks } from '../../redux/slices/booksSlice/booksSlice';
import { CardsForRendering } from '../../utils/CardsForRendering';
// constants

const cn = classNames.bind(styles);

function BooksSection() {
  const [selectedSortOption, setSelectedSortOption] = useState('')
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.data)
  const sortOptions = useSelector((state) => state.books.sortOptions)
  const isFetchDone = useSelector((state) => state.books.isFetchDone)
  const totalSearched = useSelector((state) => state.books.pagination.totalItems)
  const sortedCards = new CardsForRendering(books).sortByParam(selectedSortOption).data


  return (
    <div className={cn('books')}>
      <div className={cn('books__control-bar')}>
        {totalSearched
          ? <h1>Найдено: {totalSearched}</h1>
          : null
        }
        <Dropdown
          options={sortOptions}
          handleOption={setSelectedSortOption}
        />
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


      </div>

    </div>
  )
}

export default BooksSection;