import EmojiIcon from '../ui/EmojiIcon'
import Tabs from '../ui/Tabs'
import Tab from '../ui/Tabs/Tab'


const ReactionsSummaryTabs = ({summary, currentTab, onSelectTab}: any) => {

  return (
    <Tabs>
      {summary && summary.map((tab: any) => (
        <Tab id={tab.id} key={tab.id} onClick={() => onSelectTab(tab.id)} isActive={String(currentTab) === String(tab.id)}>
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
      ))}
    </Tabs>
  )
}

export default ReactionsSummaryTabs
