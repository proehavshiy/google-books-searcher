
import React, { Children } from 'react';

// styles
import classNames from 'classnames/bind';

import styles from './FormSection.module.scss';
// constants

const cn = classNames.bind(styles);

function FormSection({ children, title = '', labelFor }) {
  return (
    <section className={cn('section')}>
      <label className={cn('label')} htmlFor={labelFor}>
        {title}
      </label>
      {children}
    </section >
  );
}

export default FormSection;