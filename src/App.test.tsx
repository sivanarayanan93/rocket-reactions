import { Provider } from 'react-redux';
import store from './store';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { asFragment } = render(<Provider store={store}><App /></Provider>);
  expect(asFragment()).toMatchSnapshot();
});
