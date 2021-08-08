import styled from 'styled-components';
import COLORS from '../../shared/colors';

type TUiReactionsPopup = {
  left: number
};

export const UiAddReaction = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  .added-reactions {
    line-height: 40px;

    span {
      margin-right: 8px;
      padding: 6px 8px;
    }
  }
`

export const UiReactionsPopup = styled.div<TUiReactionsPopup>`
  height: 32px;
  background-color: ${COLORS.white};
  border-radius: 24px;
  box-shadow: 0px 1px 2px 1px lightgray;
  position: absolute;
  top: -40px;
  left: ${props =>`${props.left}px`};
  display: flex;
  align-items: center;
  padding: 0 8px;

  span {
    :hover {
      transform: scale(2);
      display: block;
      padding-bottom: 8px;
    }
  }
`;