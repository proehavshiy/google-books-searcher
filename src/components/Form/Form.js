
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Dropdown from '../UI/Dropdown/Dropdown';

import FormSection from './FormSection/FormSection';
import styles from './Form.module.scss';

const cn = classNames.bind(styles);

function Form({ handleSubmit, inputValue, handleInput, filterCategories, filterSelectedCategory, handleFilter }) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

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

    handleSubmit();

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
            setInputValue={handleInput}
          />
        </FormSection>
        <FormSection
          title='Выбрать категорию'
          labelFor='dropdown'>
          <Dropdown
            options={filterCategories}
            currentOption={filterSelectedCategory}
            handleOption={handleFilter}
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