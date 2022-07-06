
import React, { useState, useEffect } from 'react';

// styles
import classNames from 'classnames/bind';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import { fetchBooks, setCurrentBookId, setSelectedCategory } from '../../redux/slices/booksSlice/booksSlice';
import { setSearchQuery } from '../../redux/slices/booksSlice/booksSlice';

// constants
// components
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Dropdown from '../UI/Dropdown/Dropdown';

import FormSection from './FormSection/FormSection';
import styles from './Form.module.scss';


const cn = classNames.bind(styles);

function Form() {
  const [inputValue, setInputValue] = useState('');

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const dropdownCategories = useSelector((state) => state.books.categories);
  const [selectedQuery, setSelectedQuery] = useState('all');

  const currentPage = useLocation().pathname;
  const history = useNavigate();

  function redirectToMainPage() {
    if (currentPage !== '/') {
      history('/');
    }
  }


  useEffect(() => {
    inputValue
      ? setIsSubmitButtonDisabled(false)
      : setIsSubmitButtonDisabled(true);
  }, [inputValue]);

  function onSubmit(e) {
    e.preventDefault();

    dispatch(setSearchQuery(inputValue));
    console.log('selectedCategory:', selectedQuery);
    dispatch(setSelectedCategory(selectedQuery));
    dispatch(fetchBooks());

    dispatch(setCurrentBookId(null));
    redirectToMainPage();
  }

  return (
    <form className={cn('form')} name='form' noValidate autoComplete='off'
      onSubmit={onSubmit}
    >
      <fieldset className={cn('form__fieldset')}>
        <FormSection
          title='Найти книгу'
          labelFor='searchInput'>
          <Input
            id='searchInput'
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </FormSection>
      </fieldset>
      <Dropdown
        options={dropdownCategories}
        handleOption={setSelectedQuery}
      />
      <Button
        style={cn('form__submit')}
        type='submit'
        text='Найти'
        isDisabled={isSubmitButtonDisabled}
      />
    </form>
  );
}

export default Form;