import React from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
// components
// redux
import { useDispatch } from 'react-redux';

import { getCurrentBook } from '../../redux/slices/booksSlice/booksSlice';

import styles from './Card.module.scss';
// constants

const cn = classNames.bind(styles);

function Card({ card }) {
  const dispatch = useDispatch();


  const {
    authors, categories, image, title, publishedDate, id,
  } = card;

  const history = useNavigate();

  function goToBookPage() {
    history(`/books/${id}`);
  }

  return (
    <li className={cn('card')} onClick={goToBookPage}>
      <div className={cn('img-wrapper')}>
        <img src={image} alt='book image' className={cn('img')} />
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
  );
}

export default Card;