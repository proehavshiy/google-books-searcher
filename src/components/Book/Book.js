import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import { fetchCurrentBook } from '../../redux/slices/booksSlice/MiddleWares/fetchCurrentBook';
import constants from '../../constants/constants';

import styles from './Book.module.scss';
const cn = classNames.bind(styles);

const {
  IMG_PLACEHOLDER, TITLE_PLACEHOLDER,
  CATEGORY_PLACEHOLDER, AUTHOR_PLACEHOLDER,
  DESCRIPTION_PLACEHOLDER,
} = constants;

function Book() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const book = useSelector((state) => state.books.currentBook);

  useEffect(() => {
    dispatch(fetchCurrentBook(id));
  }, [dispatch, id]);

  const {
    volumeInfo: {
      title = TITLE_PLACEHOLDER,
      categories = [CATEGORY_PLACEHOLDER],
      authors = [AUTHOR_PLACEHOLDER],
      description = DESCRIPTION_PLACEHOLDER,
      canonicalVolumeLink = '',
      previewLink = '',
      publishedDate = new Date(null).toString(),
      imageLinks: {
        thumbnail = IMG_PLACEHOLDER,
      } = {
        thumbnail: IMG_PLACEHOLDER,
      },
    } = {},
  } = book;

  return (
    <div className={cn('book')}>
      <div className={cn('img-wrapper')}>
        <img src={thumbnail} alt='book' className={cn('img')} />
      </div><div className={cn('content')}>
        <p className={cn('categories')}>
          {categories.map(category => (
            <span className={cn('category')} key={uuidv4()}>
              {category}
            </span>
          ))}
          <span>{new Date(publishedDate).getFullYear()}</span>
        </p>
        <h2 className={cn('heading')}>
          {title}
        </h2>
        <div className={cn('info')}>
          <p className={cn('authors')}>
            {authors.map((author) => (
              <span key={uuidv4()}>
                {author}
              </span>
            ))}
          </p>
          <p className={cn('description')}>
            {description}
          </p>
          <div className={cn('link-bar')}>
            {previewLink
              ? <a href={previewLink} target='_blank' rel='noreferrer noopener'>
                ознакомительный фрагмент
              </a>
              : null}
            {canonicalVolumeLink
              ? <a href={canonicalVolumeLink} target='_blank' rel='noreferrer noopener'>
                купить книгу
              </a>
              : null}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Book;


