import { TUser } from '../Users/TUsers';
import { TReaction, TReactions } from './TReactions';

export const API_URL = {
  POST_REACTIONS: '/user_content_reactions',
  REACTIONS: '/reactions'
}

/**
 * get Processed Selected Reactions for the post
 * @param data 
 */

export const getSelelcedReactions = (data: any, metaData: any) => {
  const selectedReactionsTemp: TReactions = [],
    allReactions = metaData && metaData.reactions,
    allUsers = metaData && metaData.users,
    currentUser = metaData && metaData.currentUser;

  for(let postReaction of data) {
    const reactionId = postReaction.reaction_id,
      index = selectedReactionsTemp.findIndex(reaction => reaction.id === reactionId),
      user = allUsers.find((user: TUser) => user.id === postReaction.user_id);

    // Finding total count of reactions
    if(index >= 0) {
      if(selectedReactionsTemp[index]) {
        if (user) {
          selectedReactionsTemp[index].users.push(user);
          if (!selectedReactionsTemp[index].contentReactionId && user.id === currentUser.id) {
            selectedReactionsTemp[index].contentReactionId = postReaction.id;
          }
        }
      }

    } else {
      const reaction = allReactions.find((item: TReaction) => item.id === reactionId);

      selectedReactionsTemp.push({
        id: reactionId,
        users: user ? [user] : [],
        emoji: reaction && String(reaction.name).toLowerCase(),
        contentReactionId: user && user.id === currentUser.id ? postReaction.id : null,
        count: 1
      })
    }
  }

  return selectedReactionsTemp;
}

export const getUpdatedReactions = (reactions: TReactions, reactionPayload: any, shouldAddReaction = false, currentUser:TUser) => {
  const reactionId = reactionPayload && reactionPayload.id;

  if (!reactionId) {
    return reactions;
  };

  const tempReactions = [...reactions],
   contentReactionId = reactionPayload.contentReactionId,
   index = tempReactions.findIndex(item => item.id === reactionId),
   reaction = tempReactions[index],
   emoji = reaction ? reaction.emoji : reactionPayload.emoji;

   const getTempReactions = () => {
      // Updating existing reaction's count to the state 
      tempReactions[index] = {
        ...reaction,
        users: shouldAddReaction ? [...reaction.users, currentUser] : reaction.users.filter(item => item.id !== currentUser.id),
        contentReactionId: shouldAddReaction ? contentReactionId : null
      }

      return tempReactions;
   }

   let updatedReactions = [];

   if (reaction) {
    updatedReactions = getTempReactions();
   } else {
    // Addind new reactions to the state 
    updatedReactions = [...reactions,
      {
        id: reactionId,
        users: [{ ...currentUser}],
        emoji,
        contentReactionId: contentReactionId,
        count: 1
      }];
  }

   return updatedReactions;
}