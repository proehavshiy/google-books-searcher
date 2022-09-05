
import React, { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './FormSection.module.scss';
const cn = classNames.bind(styles);

interface IFormSection {
  title?: string;
  labelFor: string;
  children: React.ReactNode;
}

const FormSection: FC<IFormSection> = ({ children, title = '', labelFor }) => {
  return (
    <section className={cn('section')}>
      <label className={cn('label')} htmlFor={labelFor}>
        {title}
      </label>
      {children}
    </section >
  );
};

export default FormSection;