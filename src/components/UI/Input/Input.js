
import React, { useState } from 'react';
// styles
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
// constants

const cn = classNames.bind(styles);

function Input({ id = 'input', name = id, placeholder = "Введите значение", handleInput }) {
  const [inputVal, setInputVal] = useState('')

  return (
    <input
      className={cn('input')}
      placeholder={placeholder}
      type="text"
      id={id}
      name={name}
      value={inputVal}
      onChange={(e) => {
        setInputVal(e.target.value);
        if (handleInput) {
          handleInput(e.target.value)
        }
      }}
    />
  )
}

export default Input;