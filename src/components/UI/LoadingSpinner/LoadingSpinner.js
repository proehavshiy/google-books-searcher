import React from 'react';
// styles
import styles from './LoadingSpinner.module.scss';
import classNames from 'classnames/bind';

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
  )
}

export default LoadingSpinner;