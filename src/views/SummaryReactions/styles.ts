import styled from "styled-components";
import COLORS from '../../shared/colors';

type TUiSummary = {
  position?: string
}

export const UiSummary = styled.div<TUiSummary>`
  background-color: ${COLORS.white};
  border-radius: 4px;
  box-shadow: 0px 1px 4px 2px ${COLORS.borderColor};
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  top: ${props => `${props.position}`};
  z-index: 999;

  h3 {
    padding: 0 16px;
  }
`
export const TabPanel = styled.div`
  height: 210px;
  overflow-y: auto;
`