import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.scss';
const cn = classNames.bind(styles);

function Modal({ isOpen = false, onClose, children }) {

  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className={cn('popup', { 'popup_opened': isOpen })}>
      <div className={cn('container')}>
        {children}
      </div>
    </div>
  );
}

export default Modal;