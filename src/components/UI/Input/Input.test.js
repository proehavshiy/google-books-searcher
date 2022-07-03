import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../../utils/testUtils/renderWithRedux';
import Input from './Input';

describe('Input', () => {
  test('create and add new ToDo', () => {
    const { store } = renderWithRedux(<Input />)
    const getState = store.getState;
    const formEl = screen.getByRole('form');
    const inputEl = screen.getByRole('textbox')
    // проверка рендеринга
    expect(formEl).toBeInTheDocument();
    expect(inputEl).toBeInTheDocument();
    // проверка изначального стейта редакс
    expect(getState().toDo.length).toBe(1)
    expect(getState().toDo[0].value).toBe('initial ToDo')

    // печатает название туду в инпуте...
    userEvent.type(inputEl, 'my new test todo');
    expect(inputEl.value).toBe('my new test todo');

    // сабмит по Enter и добавление нового туду в список
    userEvent.keyboard('{enter}');
    // проверка нового туду в сторе
    expect(getState().toDo.length).toBe(2);
    expect(getState().toDo[1].value).toBe('my new test todo');
    // обнуление input.value
    expect(inputEl.value).toBe('');
  })
})


