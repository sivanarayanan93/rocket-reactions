import React from 'react';
import { TReaction } from '../../../shared/types/Reaction';
import { UiTabs, Tab } from './styles';

type TTabs = {
  tabs: TReaction[],
  activeTab: string | number,
  handleOnTabClick: (e: React.MouseEvent<HTMLDivElement>) => void
}


const Tabs = ({tabs, activeTab, handleOnTabClick}: TTabs) => {
  return (
    <UiTabs onClickCapture={handleOnTabClick}>
      {tabs && tabs.map((tab) => (
        <Tab data-tab-id={tab.id} data-tab-active-id={activeTab} isActive={activeTab == tab.id} key={`tab_${tab.id}`}>
          {tab.emoji}{tab.count && `.${tab.count}`}
        </Tab>
      ))}
    </UiTabs>
  )
}

export default Tabs;
