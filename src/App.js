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

import { Routes, Route, Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import BookPage from './pages/BookPage';
import { useState } from 'react';

const cn = classNames.bind(styles);

// "homepage": "https://proehavshiy.github.io/to-do-list/",




function App() {
  const dispatch = useDispatch()

  // const location = useLocation()
  // const navigate = useNavigate()

  // console.log('location:', location);
  // console.log('navigate:', navigate);
  // const params = useParams()
  // console.log('params:', params);
  // const [id, getId] = useState(null)

  // console.log('idddd:', id);

  const books = useSelector(state => state.books.data)
  // const currentBook = useSelector(state => state.books.currentBook)
  // console.log('currentBook:', currentBook);
  return (
    <div className={cn('app')} data-testid='app'>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/:id'
          //element={books.length === 0 ? <Navigate to="/" replace={true} /> : <BookPage />}
          element={books.length === 0 ? <Navigate to="/" replace={true} /> : <BookPage />}
        // element={!books.find(book => book.id === id) ? <Navigate to="/" replace={true} /> : <BookPage getId={getId} />}
        />
      </Routes>
    </div>
  );
}



export default App;
