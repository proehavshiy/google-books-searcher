import { FC } from 'react';

import Header from '../components/Header/Header';
import BooksSection from '../components/BooksSection/BooksSection';

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <BooksSection />
      </main>
    </>
  );
};

export default MainPage;