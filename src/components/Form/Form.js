
import React, { createRef, useState } from 'react';
// styles
import styles from './Form.module.scss';
import classNames from 'classnames/bind';
// redux
import { useDispatch } from 'react-redux';
import FormSection from './FormSection/FormSection';
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
// constants

const cn = classNames.bind(styles);

function Form() {
  const dispatch = useDispatch()

  function onSubmit(e) {
    e.preventDefault()

    console.log('submit:', e);
  }

  return (
    <form className={cn('form')} name="form" noValidate autoComplete="off"
      onSubmit={onSubmit}
    >
      <fieldset className={cn('form__fieldset')}>
        <FormSection
          title="Найти книгу"
          labelFor="searchInput">
          <Input
            id='searchInput' />
        </FormSection>
      </fieldset>

      <Button
        style={cn('form__submit')}
        type='submit'
        text='Найти'
        isSelected={false}
      />
    </form>
  )
}

export default Form;