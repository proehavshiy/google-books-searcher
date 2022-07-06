import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Book from '../components/Book/Book';
import Header from '../components/Header/Header';

function BookPage() {
  // const { id } = useParams()

  // const book = useSelector((state) => state.books.data).find(book => book.id === id)


  // const navigate = useNavigate()


  // useEffect(() => {
  //   getId(book)
  //   // if (!book) {
  //   //   navigate('/', { replace: true });
  //   // }
  // }, [])


  //sconsole.log('BookPage params:', params);
  return (
  // <>
  //   {book
  //     ? <><Header /><main>
  //       <Book />
  //     </main></>
  //     : null}

    // </>
    <>
      <Header />
      <main>
        <Book />
      </main>
    </>
  );
}

export default BookPage;