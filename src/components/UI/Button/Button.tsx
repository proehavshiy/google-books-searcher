import { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';
const cn = classNames.bind(styles);

interface IButton {
  style?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  isDisabled?: boolean;
  handleClick?: () => void;
}

const Button: FC<IButton> = ({ style, id = 'submit', type = 'button', text, isDisabled = false, handleClick }) => {
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
};

export default Button;