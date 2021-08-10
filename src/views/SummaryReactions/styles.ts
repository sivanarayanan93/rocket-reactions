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
  min-width: 300px;
  top: ${props => `${props.position}`};
  z-index: 999;

  h4 {
    padding: 0 16px;
    margin-bottom: 0;
  }
`
export const TabPanel = styled.div`
  height: 224px;
  overflow-y: auto;
`