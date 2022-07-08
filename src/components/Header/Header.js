import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Form from '../Form/Form';
import PageHeading from '../UI/PageHeading/PageHeading';

import { setSearchQuery, setSelectedCategory } from '../../redux/slices/booksSlice/booksSlice';
import { fetchBooks } from '../../redux/slices/booksSlice/MiddleWares/fetchBooks';

import styles from './Header.module.scss';
const cn = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();

  const filterCategories = useSelector((state) => state.books.categories);
  const filterSelectedCategory = useSelector((state) => state.books.selectedCategory);
  const searchQuery = useSelector((state) => state.books.searchQuery);

  const handleInput = (query) => dispatch(setSearchQuery(query));
  const handleFilter = (selectedCategory) => dispatch(setSelectedCategory(selectedCategory));
  const handleSubmit = () => dispatch(fetchBooks());

  return (
    <header className={cn('header')}>
      <PageHeading>Google Books Searcher</PageHeading>
      <Form
        handleSubmit={handleSubmit}
        inputValue={searchQuery}
        handleInput={handleInput}
        filterCategories={filterCategories}
        filterSelectedCategory={filterSelectedCategory}
        handleFilter={handleFilter}
      />
    </header>
  );
}

export default Header;