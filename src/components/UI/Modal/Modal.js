import React from 'react';
// styles
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

function Modal({ isOpen = false, onClose, children }) {

  useEffect(() => {
    if (onClose) {
      onClose()
    }
  }, [onClose])

  return (
    <div className={cn('popup', { 'popup_opened': isOpen })}>
      <div className={cn('container')}>
        {children}
      </div>
    </div>
  )
}

export default Modal;