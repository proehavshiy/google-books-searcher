import React from 'react';
import classNames from 'classnames/bind';

import styles from './LoadingSpinner.module.scss';
const cn = classNames.bind(styles);

function LoadingSpinner() {
  return (
    <div className={cn('spinner')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;