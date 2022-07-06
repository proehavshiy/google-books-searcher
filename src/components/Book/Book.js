import React, { useLayoutEffect } from 'react';
// styles
import styles from './Book.module.scss';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
// components
// redux
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentBook, setCurrentBookId } from '../../redux/slices/booksSlice/booksSlice';
// constants

const cn = classNames.bind(styles);

function Book() {
  const dispatch = useDispatch()
  const { id } = useParams()


  const book = useSelector((state) => state.books.currentBook)
  const isWaitingData = useSelector((state) => state.books.isFetchDone)
  console.log('isWaitingData:', isWaitingData);

  useEffect(() => {
    dispatch(getCurrentBook(id))
  }, [])

  const {
    volumeInfo: {
      title = 'Название недоступно',
      categories = ['без категории'],
      authors = ['Автор неизвестен'],
      description = 'Описание недоступно',
      canonicalVolumeLink = '',
      previewLink = '',
      publishedDate = new Date(null).toString(),
      imageLinks: {
        thumbnail = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      } = {
        thumbnail: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'
      }
    } = {}
  } = book



  return (
    <div className={cn('book')}>
      {!isWaitingData
        ?
        <div>Loading...</div>
        :
        <><div className={cn('img-wrapper')}>
          <img src={thumbnail} alt="book image" className={cn('img')} />
        </div><div className={cn('content')}>
            <p className={cn('categories')}>
              {categories.map(category => (
                <span className={cn('category')} key={uuidv4()}>{category}</span>
              ))}
              <span>{new Date(publishedDate).getFullYear()}</span>
            </p>
            <h3 className={cn('heading')}>{title}</h3>
            <div className={cn('info')}>
              <p className={cn('authors')}>
                {authors.map((author) => (
                  <span key={uuidv4()}>{author}</span>
                ))}
              </p>
              <p className={cn('description')}>
                {description}
              </p>
              <div className={cn('link-bar')}>
                {previewLink
                  ? <a href={previewLink} target='_blank' rel="noreferrer noopener">ознакомительный фрагмент</a>
                  : null}
                {canonicalVolumeLink
                  ? <a href={canonicalVolumeLink} target='_blank' rel="noreferrer noopener">купить книгу</a>
                  : null}
              </div>
            </div>
          </div></>
      }

    </div >
  )
}

export default Book;


