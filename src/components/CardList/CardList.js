import React from 'react';
import classNames from 'classnames/bind';

import Card from '../Card/Card';

import styles from './CardList.module.scss';
const cn = classNames.bind(styles);

function CardList({ cards }) {
  return (
    <ul className={cn('card-list')}>
      {cards.map(card => (
        <Card
          card={card}
          key={card.id}
        />
      ))}
    </ul>
  );
}

export default CardList;