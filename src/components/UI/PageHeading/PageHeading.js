import React from 'react';
import classNames from 'classnames/bind';

import styles from './PageHeading.module.scss';
const cn = classNames.bind(styles);

function PageHeading({ children }) {
  return (
    <h1 className={cn('page-heading')}>
      {children}
    </h1>
  );
}

export default PageHeading;