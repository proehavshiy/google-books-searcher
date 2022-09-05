import { FC } from 'react';
import classNames from 'classnames/bind';

import Card from '../Card/Card';

import { ICardForRendering } from '../../types/types';

import styles from './CardList.module.scss';
const cn = classNames.bind(styles);

interface ICardList {
  cards: ICardForRendering[];
}

const CardList: FC<ICardList> = ({ cards }) => {
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
};

export default CardList;