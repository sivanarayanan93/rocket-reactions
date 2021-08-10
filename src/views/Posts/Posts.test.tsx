import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import Posts from './index';

describe('Posts component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Provider store={store}> <Posts contents={[{id: 1, content: 'Content 1'},{id: 2, content: 'Content 2'}]}/></Provider>);
    expect(asFragment()).toMatchSnapshot();
  });
});