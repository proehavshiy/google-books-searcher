
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import { setSelectedCategory } from '../../redux/slices/booksSlice/booksSlice';
import { fetchBooks } from '../../redux/slices/booksSlice/MiddleWares/fetchBooks';
import { setSearchQuery } from '../../redux/slices/booksSlice/booksSlice';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Dropdown from '../UI/Dropdown/Dropdown';

import FormSection from './FormSection/FormSection';
import styles from './Form.module.scss';

const cn = classNames.bind(styles);

function Form() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState('all');

  const dropdownCategories = useSelector((state) => state.books.categories);

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
    dispatch(setSelectedCategory(selectedQuery));
    dispatch(fetchBooks());

    // тк при использовании формы и введении нового запроса стейт с книгами
    // каждый раз заменяется новым, то из соображений UX должнен сразу
    // быть показан результат запроса - новые книжки. 
    // Поэтому если запрос не с главной, происходит редирект на главную
    redirectToMainPage();
  }

  return (
    <form className={cn('form')} name='form' noValidate autoComplete='off'
      onSubmit={onSubmit}
    >
      <fieldset className={cn('fieldset')}>
        <FormSection
          title='Найти книгу'
          labelFor='searchInput'>
          <Input
            id='searchInput'
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </FormSection>
        <FormSection
          title='Выбрать категорию'
          labelFor='dropdown'>
          <Dropdown
            options={dropdownCategories}
            handleOption={setSelectedQuery}
          />
        </FormSection>
      </fieldset>
      <Button
        style={cn('submit')}
        type='submit'
        text='Найти'
        isDisabled={isSubmitButtonDisabled}
      />
    </form>
  );
}

export default Form;