import React, { useEffect } from 'react';
// styles
import styles from './App.module.css';
import classNames from 'classnames/bind';
// components
import Header from './components/Header/Header';
// redux
import { changeEditingMode } from './redux/slices/toDoSlice/toDoSlice';
import { useDispatch } from 'react-redux';
// constants
import { EDIT_INPUT_ID } from './constants/constants';
import Form from './components/Form/Form';
import BooksSection from './components/BooksSection/BooksSection';
import { fetchBooks } from './redux/slices/booksSlice/booksSlice';

const cn = classNames.bind(styles);

// "homepage": "https://proehavshiy.github.io/to-do-list/",


function App() {
  const dispatch = useDispatch()
  return (
    <div className={cn('app')} data-testid='app'>
      <Header />
      <main>
        <BooksSection />
      </main>
    </div>
  );
}



export default App;
