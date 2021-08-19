import { useState, useEffect, useRef } from 'react'
import useOutsideChecker from '../../../hooks/UseOutsideChecker';
import ReactedReactions from './ReactedReactions'
import ReactionSummaryPopup from './ReactionSummaryPopup';



const ReactionsSummary = ({reactions, onSelect, user}: any) => {
  const [currentTab, setCurrentTab] = useState(0),
    [showSummary, setShowSummary] = useState(false),
    [currentTabSummary, setCurrentTabSummary] = useState({emoji: '', users: []}),
    targetRef = useRef(null);

  const handleOnHoverReaction = (tabId: number) => {
    setCurrentTab(tabId)
    setShowSummary(true)
  }

  const handleOnSelectTab = (tabId: any) => {
    setCurrentTab(tabId);
    updateReactorState(reactions, tabId);
  }

  const updateReactorState = (reactions: any, tabId:any) => {
    const selectedReactions = reactions.find((item: any) => item.id === tabId);

    if(selectedReactions) {
      setCurrentTabSummary(selectedReactions);
    }    
  }

  useEffect(() => {
    if (reactions && reactions.length && currentTab) {
      updateReactorState(reactions, currentTab);
    }
  }, [reactions, currentTab]);

  const closeSummary = () => {
    setShowSummary(false);
  }

  useOutsideChecker(targetRef, closeSummary);

  return (
    <div ref={targetRef} style={{"position": "relative"}}>
      {showSummary &&
        <ReactionSummaryPopup handleOnSelectTab={handleOnSelectTab} currentTab={currentTab} reactions={reactions} users={currentTabSummary.users} emoji={currentTabSummary.emoji}/>
      }
      <ReactedReactions reactions={reactions} onHover={handleOnHoverReaction} onSelect={onSelect} user={user}/>
    </div>
  )
}

export default ReactionsSummary
