import React from 'react';
import styled from 'styled-components';

const UiTabs = styled.div`
  width: 100%;
  display: flex;
`

interface TabProps {
  readonly isActive?: boolean;
};

const Tab = styled.div<TabProps>`
  height: 40px;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;

  ${(props) => { console.log(props.isActive); return props && props.isActive && `box-shadow: inset 0px -2px 0px -1px #0f62fe;border-bottom-color: #0f62fe`}}
  
`


const Tabs = ({tabs, activeTab, handleOnTabClick}) => {

  console.log(tabs);
  return (
    <UiTabs onClickCapture={handleOnTabClick}>
      {tabs && tabs.map((tab) => (
        <Tab data-tab-id={tab.id} isActive={activeTab === tab.id} key={`tab_${tab.id}`}>
          {tab.emoji}{tab.count && `.${tab.count}`}
        </Tab>
      ))}
    </UiTabs>
  )
}

export default Tabs;
