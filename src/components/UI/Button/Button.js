import React from 'react';
// styles
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cn = classNames.bind(styles);

function Button({ style, id = 'submit', type = 'button', text, isDisabled = false, handleClick }) {
  return (
    <button
      className={cn(style)}
      id={id}
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default Button;