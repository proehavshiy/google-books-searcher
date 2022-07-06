import React from 'react';
// styles
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

function Modal({ isOpen = false, onClose, children }) {

  //закрытие по крестику, по клику вне контента
  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      if (onClose) onClose()
    }
  }
  function handleButtonClose(evt) {
    if (evt.target === evt.currentTarget) {
      if (onClose) onClose()
    }
  }

  //закрытие по Esc попапов
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscapeClose = (evt) => {
      if (evt.key === 'Escape') {
        if (onClose) onClose()
      }
    }
    document.addEventListener('keyup', handleEscapeClose);
    return () => {
      document.removeEventListener('keyup', handleEscapeClose);
    }
  }, [isOpen, onClose]);

  return (
    <div className={cn('popup', { 'popup_opened': isOpen })} onClick={handleOverlayClose}>
      <div className={cn('container')}>
        {onClose &&
          <button className={cn('close-btn')} onClick={handleButtonClose} aria-label="Кнопка Закрыть" type="button" />
        }
        {children}
      </div>
    </div>
  )
}

export default Modal;