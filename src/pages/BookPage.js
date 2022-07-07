import React from 'react';

import Book from '../components/Book/Book';
import Header from '../components/Header/Header';

function BookPage() {
  return (
    <>
      <Header />
      <main>
        <Book />
      </main>
    </>
  );
}

export default BookPage;