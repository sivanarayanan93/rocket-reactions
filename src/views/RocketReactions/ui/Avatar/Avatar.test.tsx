import { render } from '@testing-library/react';
import Avatar from './index';

describe('Avatar component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Avatar url ="https://dummuy.com/image.png"/>);
    expect(asFragment()).toMatchSnapshot();
  });
});