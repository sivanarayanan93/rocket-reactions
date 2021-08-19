import { RocketReactions } from '../style';
import ReactionsPickerTrigger from './ReactionsPickerTrigger';
import ReactionsSummary from './ReactionsSummary';

const ReactionsPicker = ({reactions, onSelect, summary, user}: any) => {
  return (
    <RocketReactions>
      <ReactionsSummary reactions={summary} onSelect={onSelect} user={user}/>
      <ReactionsPickerTrigger onSelect={onSelect} reactions={reactions} />
    </RocketReactions>
  )
}

export default ReactionsPicker;
