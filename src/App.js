import React, { useEffect } from 'react';
// styles
import styles from './App.module.css';
import classNames from 'classnames/bind';
// pages
import MainPage from './pages/mainPage';
// components
import Header from './components/Header/Header';
// redux
import { useDispatch, useSelector } from 'react-redux';
// constants
import { EDIT_INPUT_ID } from './constants/constants';
import Form from './components/Form/Form';
import BooksSection from './components/BooksSection/BooksSection';

import { Routes, Route, Navigate, Link } from 'react-router-dom';
import BookPage from './pages/BookPage';

const cn = classNames.bind(styles);

// "homepage": "https://proehavshiy.github.io/to-do-list/",




function App() {
  const dispatch = useDispatch()

  const books = useSelector(state => state.books.data)
  console.log('bookdfds:', books);
  return (
    <div className={cn('app')} data-testid='app'>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/:id'
          element={books.length === 0 ? <Navigate to="/" /> : <BookPage />}
        />
      </Routes>
    </div>
  );
}



export default App;
