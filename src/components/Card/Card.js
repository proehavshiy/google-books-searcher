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
      <div className={cn('img-wrapper')}>
        <img src={image} alt="book image" className={cn('img')} />
      </div>
      <div className={cn('content')}>
        <p className={cn('category')}>{categories[0]}</p>
        <h3 className={cn('heading')}>{title}</h3>
        <div className={cn('info')}>
          <p className={cn('authors')}>
            {authors.map((author) => (
              <span key={uuidv4()}>{author}</span>
            ))}
          </p >
          <p>{new Date(publishedDate).getFullYear()}</p>
        </div>
      </div >
    </li >
  )
}

export default Card;