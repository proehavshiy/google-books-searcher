import React from 'react';
// styles
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch } from 'react-redux';
// constants

const cn = classNames.bind(styles);

function Card({ card }) {
  const dispatch = useDispatch()

  return (
    <li className={cn('card')}>
      {card.name}
    </li >
  )
}

export default Card;