import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';
const cn = classNames.bind(styles);

function Dropdown({ options, handleOption }) {
  const [selectorHeading, setSelectorHeading] = useState('');
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    setSelectorHeading(options[0].name);

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
    setSelectorHeading(selectedOption.name);
    handleOption(selectedOption.value);
    closeOptionsTab(selectedOption);
  }

  return (
    <div className={cn('dropdown')}>
      <p className={cn('title')}
        ref={selectorRef}
        onClick={() => setAreOptionsVisible(!areOptionsVisible)}
      >
        {selectorHeading}
        <span></span>
      </p>
      <ul className={cn('options', { 'options_opened': areOptionsVisible })}>
        {options
          .filter(option => option.name !== selectorHeading)
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