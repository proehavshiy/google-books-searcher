import React, { useEffect } from 'react';
// styles
import styles from './BooksSection.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../UI/Dropdown/Dropdown';
import CardList from '../CardList/CardList';
import { fetchBooks } from '../../redux/slices/booksSlice/booksSlice';
// constants

const cn = classNames.bind(styles);

function BooksSection() {
  const dispatch = useDispatch()
  const books = useSelector((state) => state.books.data)

  useEffect(() => {
    // fetchBooks()
    // dispatch(fetchBooks())
  }, [books])

  return (
    <div className={cn('books')}>
      <div className={cn('books__control-bar')}>
        {books.totalItems
          ? <h1>Найдено: {books.totalItems}</h1>
          : null
        }
        <Dropdown
          options={[
            { name: 'relevance', value: 'relevance', id: 1 },
            { name: 'newest', value: 'newest', id: 2 },
          ]}
        />
      </div>
      <div className={cn('books__content')}>
        {books?.items?.length
          ?
          <CardList
            cards={books.items}
          />
          : null
        }


      </div>

    </div>
  )
}

export default BooksSection;