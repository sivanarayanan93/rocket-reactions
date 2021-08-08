import React from 'react'
import { TReaction } from '../../shared/types/Reaction'
import EmojiIcon from '../ui/EmojiIcon'

type TSelectedReactions = {
  reactions: TReaction[],
  handleOnEmojiClick: (e: React.MouseEvent<HTMLDivElement>) => void,
  handleOnEmojiHover: (e: React.MouseEvent<HTMLDivElement>) => void,
  handleOnEmojiMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}

const SelectedReactions = ({reactions, handleOnEmojiClick, handleOnEmojiHover, handleOnEmojiMouseDown}: TSelectedReactions) => {
  return (
    <div className='added-reactions' 
      onClickCapture={handleOnEmojiClick}
      onMouseOverCapture ={handleOnEmojiHover}
      onMouseDownCapture= {handleOnEmojiMouseDown}
      >
      {reactions && reactions.map((reaction) => {
        return reaction.count > 0 && <EmojiIcon
          isSelected={reaction.isReactedByCurrentUser}
          bordered={true}
          key={reaction.id}
          data-reaction-emoji={reaction.emoji}
          data-reaction-id={reaction.id}>
          {reaction.emoji} {reaction.count}
        </EmojiIcon>
      })}
    </div>
  )
}

export default SelectedReactions
