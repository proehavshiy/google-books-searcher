import React from 'react';
// styles
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

function Dropdown({ options, handleOption }) {
  const [selectorHeading, setSelectorHeading] = useState('');
  const [areOptionsVisible, setAreOptionsVisible] = useState(false)
  const selectorRef = useRef(null)

  useEffect(() => {
    setSelectorHeading(options[0].name)

    window.addEventListener('click', closeOptionsTab);
    return () => {
      window.removeEventListener('click', closeOptionsTab);
    }
  }, [])

  function closeOptionsTab(e) {
    if (e.target === selectorRef.current) return;
    setAreOptionsVisible(false)
  }

  function selectOption(selectedOption) {
    setSelectorHeading(selectedOption.name)
    handleOption(selectedOption.value)
    closeOptionsTab(selectedOption)
  }

  return (
    <div className={cn('dropdown')}>
      <p className={cn('dropdown__title')}
        ref={selectorRef}
        onClick={() => setAreOptionsVisible(!areOptionsVisible)}
      >
        {selectorHeading}
        <span></span>
      </p>
      {areOptionsVisible
        ? (
          <ul className={cn('dropdown__options')}>
            {options.map(option => (
              <li className={cn('dropdown__option')}
                key={option.id}
                onClick={() => selectOption(option)}
              >
                {option?.name}
              </li>
            ))}
          </ul>
        )
        : null
      }
    </div >
  )
}

export default Dropdown;