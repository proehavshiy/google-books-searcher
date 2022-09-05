import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import Button from '../../components/UI/Button/Button';
import PageHeading from '../../components/UI/PageHeading/PageHeading';

import styles from './ErrorPage.module.scss';
const cn = classNames.bind(styles);

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate('/', { replace: true });
  }

  return (
    <div className={cn('error-page')}>
      <PageHeading>404 такой страницы нет</PageHeading>
      <Button
        style={cn('goBack')}
        text='Вернуться на главную'
        handleClick={goBack}
      />
    </div>
  );
};

export default ErrorPage;
