
import React, { useState, useEffect } from 'react';
// styles
import styles from './Form.module.scss';
import classNames from 'classnames/bind';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/slices/booksSlice/booksSlice';
// constants
// components
import FormSection from './FormSection/FormSection';
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import Dropdown from '../UI/Dropdown/Dropdown';

const cn = classNames.bind(styles);

function Form() {
  const [searchPhrase, setSearchPhrase] = useState('')
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const dispatch = useDispatch()
  const dropdownCategories = useSelector((state) => state.books.categories)

  useEffect(() => {
    searchPhrase
      ? setIsSubmitButtonDisabled(false)
      : setIsSubmitButtonDisabled(true)
  }, [searchPhrase])

  function onSubmit(e) {
    e.preventDefault()

    console.log('form category:', selectedCategory);
    dispatch(fetchBooks({ searchPhrase, selectedCategory }))
    setSearchPhrase('')
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
            id='searchInput'
            inputValue={searchPhrase}
            setInputValue={setSearchPhrase}
          />
        </FormSection>
      </fieldset>
      <Dropdown
        options={dropdownCategories}
        handleOption={setSelectedCategory}
      />
      <Button
        style={cn('form__submit')}
        type='submit'
        text='Найти'
        isDisabled={isSubmitButtonDisabled}
      />
    </form>
  )
}

export default Form;