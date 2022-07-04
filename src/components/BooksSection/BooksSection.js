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
import { CardsForRendering } from '../../utils/sortCards';
// constants

const cn = classNames.bind(styles);

function BooksSection() {
  const [selectedSortOption, setSelectedSortOption] = useState('')
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.data)
  const sortedCards = new CardsForRendering(books).sortByParam(selectedSortOption).data


  return (
    <div className={cn('books')}>
      <div className={cn('books__control-bar')}>
        {books.length
          ? <h1>Найдено: {books.length}</h1>
          : null
        }
        <Dropdown
          options={[
            { name: 'relevance', value: '', id: 1 },
            { name: 'newest', value: 'newest', id: 2 },
            { name: 'oldest', value: 'oldest', id: 3 },
          ]}
          handleOption={setSelectedSortOption}
        />
      </div>
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