import React from 'react'
import { TStringOrNumber } from '../../shared/common/TCommon'
import { TReactions } from '../../shared/Reactions/TReactions'
import EmojiIcon from '../ui/EmojiIcon'
import Tabs from '../ui/Tabs'
import Tab from '../ui/Tabs/Tab'

type TSummaryReactionsTabs = {
  tabs: TReactions,
  activeTab: TStringOrNumber,
  handleOnTabClick: (id: TStringOrNumber, e?: React.MouseEvent<HTMLDivElement>) => void
}

const ReactionTabs = ({tabs, activeTab, handleOnTabClick}: TSummaryReactionsTabs) => {
  return (
    <Tabs>
      {tabs && tabs.map((tab) => (
        <Tab id={tab.id} key={tab.id} isActive={String(activeTab) === String(tab.id)}>
          <EmojiIcon onClick={() => handleOnTabClick(tab.id)}>
              {tab.emoji}
              {tab.count && 
                <>
                  <span className="emoji-count">.</span>
                  <span className="emoji-count">{tab.count}</span>
                </>
              }
          </EmojiIcon>
        </Tab>
      ))}
    </Tabs>
  )
}

export default ReactionTabs
