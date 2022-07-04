import React from 'react';
// styles
import styles from './Card.module.scss';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
// components
// redux
import { useDispatch } from 'react-redux';
// constants

const cn = classNames.bind(styles);

function Card({ card }) {
  const dispatch = useDispatch()

  const {
    authors, categories, image, title, publishedDate
  } = card

  return (
    <li className={cn('card')}>
      <div className={cn('card__img-wrapper')}>
        <img src={image} alt="book image" className={cn('card__img')} />
      </div>
      <div className={cn('card__content')}>
        <p className={cn('card__category')}>
          {categories[0]}
        </p>
        <h3 className={cn('card__heading')}>
          {title}
        </h3>
        {authors.map(author => (
          <p className={cn('card__author')} key={uuidv4()}>
            {author}
          </p>
        ))}
        <span>{publishedDate}</span>
      </div >
    </li >
  )
}

export default Card;