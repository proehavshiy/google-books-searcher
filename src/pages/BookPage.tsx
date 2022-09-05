import { FC } from 'react';

import Book from '../components/Book/Book';
import Header from '../components/Header/Header';

const BookPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Book />
      </main>
    </>
  );
};

export default BookPage;