import { render } from '@testing-library/react';
import Posts from './index';

describe('Posts component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Posts contents={[{id: 1, content: 'Content 1'},{id: 2, content: 'Content 2'}]}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});