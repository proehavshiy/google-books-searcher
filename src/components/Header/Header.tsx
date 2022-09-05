import { FC } from 'react';
import classNames from 'classnames/bind';

import Form from '../Form/Form';
import PageHeading from '../UI/PageHeading/PageHeading';

import { setSearchQuery, setSelectedCategory } from '../../redux/slices/booksSlice/booksSlice';
import { fetchBooks } from '../../redux/slices/booksSlice/MiddleWares/fetchBooks';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';

import { ICategory } from '../../types/types';

import styles from './Header.module.scss';
const cn = classNames.bind(styles);

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const filterCategories = useAppSelector((state) => state.books.categories);
  const filterSelectedCategory = useAppSelector((state) => state.books.selectedCategory);
  const searchQuery = useAppSelector((state) => state.books.searchQuery);

  const handleInput = (query: string) => dispatch(setSearchQuery(query));
  const handleFilter = (selectedCategory: ICategory) => dispatch(setSelectedCategory(selectedCategory));
  const handleSubmit = () => dispatch(fetchBooks(true));

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
};

export default Header;