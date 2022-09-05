import React, { useState, useEffect, useRef, FC } from 'react';

import classNames from 'classnames/bind';

import { ICategory } from '../../../types/types';

import styles from './Dropdown.module.scss';
const cn = classNames.bind(styles);

interface IDropdown {
  options: ICategory[];
  currentOption: ICategory;
  handleOption: (selectedOption: ICategory) => void;
}

const Dropdown: FC<IDropdown> = ({ options, currentOption, handleOption }) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState<boolean>(false);
  const selectorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    window.addEventListener('click', closeOptionsTab);
    return () => {
      window.removeEventListener('click', closeOptionsTab);
    };
  }, [options]);

  function closeOptionsTab(e?: MouseEvent): void {
    if (e && e.target === selectorRef.current) return;
    setAreOptionsVisible(false);
  }

  function selectOption(selectedOption: ICategory): void {
    handleOption(selectedOption);
    closeOptionsTab();
  }

  return (
    <div className={cn('dropdown')}>
      <p className={cn('title')}
        ref={selectorRef}
        onClick={() => setAreOptionsVisible(!areOptionsVisible)}
      >
        {currentOption.name}
        <span></span>
      </p>
      <ul className={cn('options', { 'options_opened': areOptionsVisible })}>
        {options
          .filter(option => option.value !== currentOption.value)
          .map(option => (
            <li className={cn('option')}
              key={option.id}
              onClick={() => selectOption(option)}
            >
              {option.name}
            </li>
          ))}
      </ul>
    </div >
  );
};

export default Dropdown;