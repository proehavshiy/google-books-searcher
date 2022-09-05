import { FC } from 'react';
import classNames from 'classnames/bind';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from '../../pages/MainPage';
import BookPage from '../../pages/BookPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Modal from '../UI/Modal/Modal';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import { setError } from '../../redux/slices/booksSlice/booksSlice';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';

import styles from './App.module.scss';

const cn = classNames.bind(styles);

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { data: books, error } = useAppSelector(state => state.books);
  const isLoading = useAppSelector(state => !state.books.isFetchDone);


  function closeErrorModal() {
    if (error) {
      setTimeout(() => {
        dispatch(setError(null));
      }, 2000);
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
          element={books.length === 0 ? <Navigate to='/' replace={true} /> : <BookPage />}
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
};

export default App;