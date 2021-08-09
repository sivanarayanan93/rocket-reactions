import React from 'react'
import { TReaction, TReactions } from '../../shared/Reactions/TReactions'
import EmojiIcon from '../ui/EmojiIcon'

type TSelectedReactions = {
  reactions: TReactions,
  handleOnEmojiClick: (reaction: TReaction, e?: React.MouseEvent<HTMLDivElement>) => void,
  handleOnEmojiHover: (e: React.MouseEvent<HTMLDivElement>) => void,
  handleOnEmojiMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}

const SelectedReactions = ({reactions, handleOnEmojiClick, handleOnEmojiHover, handleOnEmojiMouseDown}: TSelectedReactions) => {
  return (
    <div className='added-reactions' onMouseOverCapture ={handleOnEmojiHover} onMouseDownCapture= {handleOnEmojiMouseDown}>
      {reactions && reactions.map((reaction) => {
        return reaction.count > 0 && <EmojiIcon
          className="emoji"
          isSelected={reaction.isReactedByCurrentUser}
          onClickCapture={() => handleOnEmojiClick(reaction)}
          bordered={true}
          key={reaction.id}
          data-reaction-emoji={reaction.emoji}
          data-reaction-id={reaction.id}>
          {reaction.emoji && reaction.emoji.trim()}<label className="emoji-count">{reaction.count}</label>
        </EmojiIcon>
      })}
    </div>
  )
}

export default SelectedReactions
