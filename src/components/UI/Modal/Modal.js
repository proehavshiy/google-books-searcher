import React from 'react';
// styles
import styles from './PageHeading.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function PageHeading({ children }) {
  return (
    <h1 className={cn('page-heading')}>
      {children}
    </h1>
  )
}

export default PageHeading;