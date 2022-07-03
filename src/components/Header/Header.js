import React from 'react';
// styles
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../redux/slices/toDoSlice/toDoSlice';
// constants
import { HEADER_TEXT } from '../../constants/constants';
import Form from '../Form/Form';

const cn = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch()

  function handleToggleAllBtn() {
    dispatch(changeStatus({ changeAll: true }))
  }

  return (
    <header className={cn('header')} data-testid='header'>
      <h1>Google Books</h1>
      <Form />
    </header>
  )
}

export default Header;