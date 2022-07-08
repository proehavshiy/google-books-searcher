import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
const cn = classNames.bind(styles);

function Dropdown({ options, currentOption, handleOption }) {
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', closeOptionsTab);
    return () => {
      window.removeEventListener('click', closeOptionsTab);
    };
  }, [options]);

  function closeOptionsTab(e) {
    if (e.target === selectorRef.current) return;
    setAreOptionsVisible(false);
  }

  function selectOption(selectedOption) {
    handleOption(selectedOption);
    closeOptionsTab(selectedOption);
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
              {option?.name}
            </li>
          ))}
      </ul>
    </div >
  );
}

export default Dropdown;