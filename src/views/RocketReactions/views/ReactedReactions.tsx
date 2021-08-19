import EmojiIcon from '../ui/EmojiIcon'

const ReactedReactions = ({reactions, onSelect, onHover, user}: any) => {

  return (
    <div>
      {reactions && reactions.map((reaction: any) => (
        <EmojiIcon onHover={onHover} isSelected={reaction.users.find((item: any) => item.id === user && user.id)} onSelect={onSelect} reaction={reaction} variant="bordered" key={reaction.emoji}>
          {reaction.emoji}<label className="emoji-count">{reaction.count}</label>
        </EmojiIcon>
      ))}
    </div>
  )
}

export default ReactedReactions;
