import { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './LoadingSpinner.module.scss';
const cn = classNames.bind(styles);

const LoadingSpinner: FC = () => {
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
};

export default LoadingSpinner;