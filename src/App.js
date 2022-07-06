import React from 'react';
// styles
import styles from './App.module.css';
import classNames from 'classnames/bind';
// pages
import MainPage from './pages/mainPage';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setError } from './redux/slices/booksSlice/booksSlice';

import { Routes, Route, Navigate } from 'react-router-dom';
import BookPage from './pages/BookPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Modal from './components/UI/Modal/Modal';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';

const cn = classNames.bind(styles);

// "homepage": "https://proehavshiy.github.io/to-do-list/",

function App() {
  const dispatch = useDispatch()

  const books = useSelector(state => state.books.data)
  const isLoading = useSelector(state => !state.books.isFetchDone)
  const error = useSelector(state => state.books.error)

  function closeErrorModal() {
    if (error) {
      setTimeout(() => {
        dispatch(setError(null))
      }, 2000)
    }
  }

  return (
    <div className={cn('app')} data-testid='app'>
      <Routes>
        <Route
          path='/'
          element={<MainPage />}
        />
        <Route
          path='/books/:id'
          element={books.length === 0 ? <Navigate to="/" replace={true} /> : <BookPage />}
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
      <Modal
        isOpen={isLoading}
      >
        <LoadingSpinner />
      </Modal>
      <Modal
        isOpen={error}
        onClose={closeErrorModal}
      >
        <div>{error}</div>
      </Modal>
    </div>
  );
}



export default App;
