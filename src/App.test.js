import { screen } from '@testing-library/react';
import App from './App';
import { renderWithRedux } from './utils/testUtils/renderWithRedux';


describe('App', () => {
  test('App rendering', () => {
    renderWithRedux(<App />);
    const AppEl = screen.getByTestId('app');
    expect(AppEl).toBeInTheDocument();
  });
});