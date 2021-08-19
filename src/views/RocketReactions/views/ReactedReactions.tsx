import EmojiIcon from '../ui/EmojiIcon'

const ReactedReactions = ({reactions, onSelect, onHover, user}: any) => {

  const userId = user && user.id;

  return (
    <div>
      {reactions && reactions.map((reaction: any) => (
        <EmojiIcon onHover={onHover} isSelected={reaction.users.find((item: any) => item.id === userId)} onSelect={onSelect} reaction={reaction} variant="bordered" key={reaction.emoji}>
          {reaction.emoji}<label className="emoji-count">{reaction.count}</label>
        </EmojiIcon>
      ))}
    </div>
  )
}

export default ReactedReactions;
