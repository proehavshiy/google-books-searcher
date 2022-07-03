import React from 'react';
// styles
import styles from './BooksSection.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch } from 'react-redux';
import Dropdown from '../UI/Dropdown/Dropdown';
import CardList from '../CardList/CardList';
// constants

const cn = classNames.bind(styles);

function BooksSection() {
  const dispatch = useDispatch()

  return (
    <div className={cn('books')}>
      <div className={cn('books__control-bar')}>
        <Dropdown
          options={[
            { name: 'relevance', value: 'relevance', id: 1 },
            { name: 'newest', value: 'newest', id: 2 },
          ]}
        />
      </div>
      <div className={cn('books__content')}>
        <CardList
          cards={
            [
              { name: 'card1', id: 1 },
              { name: 'card2', id: 2 }
            ]
          }
        />
      </div>

    </div>
  )
}

export default BooksSection;