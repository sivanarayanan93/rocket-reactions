import { render } from '@testing-library/react';
import EmojiIcon from './index';

describe('Avatar component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<EmojiIcon>Test</EmojiIcon>);
    expect(asFragment()).toMatchSnapshot();
  });
});