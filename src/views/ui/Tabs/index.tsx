import React from 'react';
import { TStringOrNumber } from '../../../shared/common/TCommon';
import { TReactions } from '../../../shared/Reactions/TReactions';
import EmojiIcon from '../EmojiIcon';
import { UiTabs, Tab } from './styles';

type TTabs = {
  tabs: TReactions,
  activeTab: TStringOrNumber,
  handleOnTabClick: (id: TStringOrNumber, e: React.MouseEvent<HTMLDivElement>) => void
}


const Tabs = ({tabs, activeTab, handleOnTabClick}: TTabs) => {
  return (
    <UiTabs>
      {tabs && tabs.map((tab) => (
        <>
          <Tab onClick={e => handleOnTabClick(tab.id, e)} data-tab-id={tab.id} data-tab-active-id={activeTab} isActive={String(activeTab) === String(tab.id)} key={`tab_${tab.id}`}>
            <EmojiIcon>
              {tab.emoji}
              {tab.count && 
                <>
                  <span className="emoji-count">.</span>
                  <span className="emoji-count">{tab.count}</span>
                </>
              }
            </EmojiIcon>
          </Tab>
        </>
      ))}
    </UiTabs>
  )
}

export default Tabs;
