
import React, { createRef, useState } from 'react';
// styles
import styles from './Input.module.css';
import classNames from 'classnames/bind';
// redux
import { useDispatch } from 'react-redux';
import { addNewToDo } from '../../../redux/slices/toDoSlice/toDoSlice';
// constants
import { INPUT_PLACEHOLDER } from '../../../constants/constants';

const cn = classNames.bind(styles);

function Input() {
  const dispatch = useDispatch()

  const inputRef = createRef(null)
  const [inputVal, setInputVal] = useState('')

  return (
    <form className={cn('form')} name="form" noValidate autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault()
        const newToDoPayload = inputRef.current.value
        // update store in case of not empty input
        if (newToDoPayload !== '') {
          dispatch(addNewToDo(newToDoPayload))
          // clear input after that
          inputRef.current.value = ''
        }

      }}
    >
      <input
        className={cn('new-todo')}
        placeholder={INPUT_PLACEHOLDER}
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        ref={inputRef}
      />
    </form>
  )
}

export default Input;