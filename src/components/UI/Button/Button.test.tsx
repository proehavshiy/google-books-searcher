import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('UIButton', () => {
  test('render', () => {
    render(<Button text='загрузить' />);

    const UIButtonEl = screen.getByRole('button');
    expect(UIButtonEl).toBeInTheDocument();
  });

  test('check default props', () => {
    render(<Button
      text='загрузить'
    />);

    const buttonEl = screen.getByRole('button');

    expect(buttonEl).toHaveTextContent('загрузить');
    expect(buttonEl).toHaveAttribute('type', 'button');
    expect(buttonEl).toHaveAttribute('id', 'submit');
    expect(buttonEl).not.toHaveAttribute('disabled');
  });

  test('check custom props', () => {
    render(
      <Button
        text='загрузить'
        style='menu__submit-button'
        type='submit'
        id='submitBtn'
        isDisabled
      />,
    );

    const buttonEl = screen.getByRole('button');

    expect(buttonEl).toHaveAttribute('type', 'submit');
    expect(buttonEl).toHaveAttribute('id', 'submitBtn');
    expect(buttonEl).toHaveAttribute('disabled');
    expect(buttonEl).toHaveClass('menu__submit-button');
  });

  test('handleClick was fired', () => {
    const onClick = jest.fn();
    render(<Button
      text='загрузить'
      handleClick={onClick}
    />);

    const buttonEl = screen.getByRole('button');
    userEvent.click(buttonEl);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});