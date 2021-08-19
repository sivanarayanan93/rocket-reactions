import styled from 'styled-components';
import COLORS from '../../../../shared/colors';

const { LIGHT_GRAY, PRIMARY_BLUE } = COLORS;

export const UiTabs = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${LIGHT_GRAY};
`
interface TabProps {
  readonly isActive?: boolean;
};

export const UiTab = styled.div<TabProps>`
  height: 40px;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  display: flex;
  font-size: 14px;

  ${(props) => props && props.isActive && `box-shadow: 0px 1px 0px 0px ${PRIMARY_BLUE};border-bottom: 1px solid ${PRIMARY_BLUE};`}
  
`
export const UiTabPanel = styled.div`
  height: 224px;
  overflow-y: auto;
`