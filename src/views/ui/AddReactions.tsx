import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import COLORS from '../../shared/colors';
import Button from './Button';
import ReactTooltip from 'react-tooltip';
import SummaryReactions from './SummaryReactions';
import EmojiIcon from './EmojiIcon';


const reactions = [
  {
    "id": 1,
    "name": "Like",
    "emoji": "👍"
  },
  {
    "id": 2,
    "name": "Love",
    "emoji": "❤️"
  },
  {
    "id": 3,
    "name": "Haha",
    "emoji": "😂"
  },
  {
    "id": 4,
    "name": "Wow",
    "emoji": "😮"
  },
  {
    "id": 5,
    "name": "Sad",
    "emoji": "😥"
  },
  {
    "id": 6,
    "name": "Angry",
    "emoji": "😡"
  }
];

const UiAddReaction = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  .added-reactions {
    line-height: 40px;

    span {
      margin-right: 8px;
      padding: 6px 8px;
    }
  }
`

const UiReactionsPopup = styled.div`
  height: 32px;
  background-color: ${COLORS.white};
  border-radius: 24px;
  box-shadow: 0px 1px 2px 1px lightgray;
  position: absolute;
  top: -40px;
  left: calc(50%);
  display: flex;
  align-items: center;
  padding: 0 8px;

  span {
    :hover {
      transform: scale(2);
      display: block;
      padding-bottom: 8px;
    }
  }
`;

type Props = {
  initSelectedReactions: {
    [key: string]: {
      [key: string]: any
    }
  }
}

const initSelectedReactions = [{id: '1', emoji: '👍', count: 100, userId: 4}, {id: '2', emoji: '❤️', count: 100, userId: 3},
{
  "id": '3',
  "name": "Haha",
  "emoji": "😂",
  count: 100, userId: 2
  
},
{
  "id": '4',
  "name": "Wow",
  "emoji": "😮",
  count: 100, userId: 2
},
{
  "id": '5',
  "name": "Sad",
  "emoji": "😥",
  count: 100, userId: 2
},
{
  "id": '6',
  "name": "Angry",
  "emoji": "😡",
  count: 100, userId: 2
}
];
const currentUserId = 4;


const AddReactions = () => {
  const [showReactions, setShowReactions] = useState(false),
    [showSummary, setShowSummary] = useState(false),
    [activeTab, setActiveTab] = useState(false),
    [selectedReactions, setSelectedReactions] = useState(initSelectedReactions);

  useEffect(() => {
      ReactTooltip.rebuild();
  });

  const handleOnEmojiClick = (e: any) => {
    const reactionName = e.target.getAttribute('data-reaction-emoji'),
      reactionId = e.target.getAttribute('data-reaction-id');

    if(!reactionId) {
      return;
    }

    let selectedReaction = selectedReactions.find(reaction => reaction.id === reactionId );


    if(selectedReaction) {
      selectedReaction.count -= 1;
    } else {
      selectedReaction = { id: reactionId, emoji: reactionName, count: 1, userId: 4}
    }

    setSelectedReactions([
      ...selectedReactions,
         selectedReaction
    ])
  }

  const handleOnEmojiHover = (e) => {
    const reactionId = e.target.getAttribute('data-reaction-id');
    if(reactionId) {
      setTimeout(() => {
        setActiveTab(reactionId);
        setShowSummary(true);
      }, 1000)
      
    }
  }

  return (
    <UiAddReaction>
       {showSummary && <SummaryReactions tabList={selectedReactions} activeTab={activeTab}/>}

       <div className='added-reactions' onClickCapture={handleOnEmojiClick} onMouseOverCapture={handleOnEmojiHover}>
        {selectedReactions && selectedReactions.map((reaction) => (
          <EmojiIcon
            isSelected={reaction.userId === currentUserId}
            bordered={true}
            key={reaction.id}
            data-reaction-emoji={reaction.emoji}
            data-reaction-id={reaction.id}>
            {reaction.emoji} {reaction.count}
          </EmojiIcon>
        ))}
        
       </div>

       <div>
        {showReactions && 
          <UiReactionsPopup onClickCapture={handleOnEmojiClick}>
            {reactions.map((reaction) => (
              <a key={reaction.id}>
              <EmojiIcon
                data-reaction-emoji={reaction.emoji} 
                data-reaction-id={reaction.id} 
                data-for="reactions" 
                data-tip={reaction.name}>
                {reaction.emoji}
              </EmojiIcon>
              <ReactTooltip id="reactions" place="top" effect="solid"/>
              </a>
            ))}
          </UiReactionsPopup>
        }
        <Button onClick={() => setShowReactions(true)}/>
       </div>      
    </UiAddReaction>
  )
}

export default AddReactions