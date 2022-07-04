import React from 'react';
// styles
import styles from './CardList.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch } from 'react-redux';
import Card from '../Card/Card';
// constants

const cn = classNames.bind(styles);

function CardList({ cards }) {
  const dispatch = useDispatch()

  console.log('cards:', cards);

  return (
    <ul className={cn('card-list')}>
      {cards.map(card => (
        <Card
          card={card}
          key={card.id}
        />
      ))}
    </ul>
  )
}

export default CardList;