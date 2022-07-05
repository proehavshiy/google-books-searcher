import React from 'react';
import Header from '../components/Header/Header';
import BooksSection from '../components/BooksSection/BooksSection';

function MainPage() {
  return (
    <>
      <Header />
      <main>
        <BooksSection />
      </main>
    </>
  )
}

export default MainPage;