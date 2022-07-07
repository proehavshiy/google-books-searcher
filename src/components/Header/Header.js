import React from 'react';
import classNames from 'classnames/bind';

import Form from '../Form/Form';
import PageHeading from '../UI/PageHeading/PageHeading';

import styles from './Header.module.scss';
const cn = classNames.bind(styles);

function Header() {
  return (
    <header className={cn('header')}>
      <PageHeading>Google Books Searcher</PageHeading>
      <Form />
    </header>
  );
}

export default Header;