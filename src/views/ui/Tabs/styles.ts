import styled from 'styled-components';

export const UiTabs = styled.div`
  width: 100%;
  display: flex;
`
interface TabProps {
  readonly isActive?: boolean;
};

export const Tab = styled.div<TabProps>`
  height: 40px;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;

  ${(props) => props && props.isActive && `box-shadow: inset 0px -2px 0px -1px #0f62fe;border-bottom-color: #0f62fe;`}
  
`