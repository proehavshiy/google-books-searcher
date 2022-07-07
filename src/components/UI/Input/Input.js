
import React from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';
const cn = classNames.bind(styles);

function Input({ id = 'input', name = id, placeholder = 'Введите значение', inputValue, setInputValue }) {
  return (
    <input
      className={cn('input')}
      placeholder={placeholder}
      type='text'
      id={id}
      name={name}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

export default Input;