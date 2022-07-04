
import React, { useState } from 'react';
// styles
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
// constants

const cn = classNames.bind(styles);

function Input({ id = 'input', name = id, placeholder = "Введите значение", inputValue, setInputValue }) {
  return (
    <input
      className={cn('input')}
      placeholder={placeholder}
      type="text"
      id={id}
      name={name}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  )
}

export default Input;