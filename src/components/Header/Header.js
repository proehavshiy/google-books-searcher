import React from 'react';

// styles
import classNames from 'classnames/bind';
// components
// redux
import { useDispatch } from 'react-redux';

// constants
import { HEADER_TEXT } from '../../constants/constants';
import Form from '../Form/Form';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();


  return (
    <header className={cn('header')} data-testid='header'>
      <h1>Google Books</h1>
      <Form />
    </header>
  );
}

export default Header;