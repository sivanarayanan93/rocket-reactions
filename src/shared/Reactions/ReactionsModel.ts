import { getCurrentUserFromStore, getReactionsFromStore } from '../common/CommonModel';
import { TUser } from '../Users/TUsers';
import { TReactions } from './TReactions';

export const API_URL = {
  POST_REACTIONS: '/user_content_reactions',
  REACTIONS: '/reactions'
}

export const getSelectedReactions = (data: any) => {
  const selectedReactionsTemp: TReactions = [],
  currentUser = getCurrentUserFromStore(),
  allReactions = getReactionsFromStore();

  for(let postReaction of data) {
    const reactionId = postReaction.reaction_id,
      index = selectedReactionsTemp.findIndex(reaction => reaction.id === reactionId);

    const isReactedByCurrentUser = currentUser.id === postReaction.user_id;

    if(index >= 0) {
      selectedReactionsTemp[index].count += 1;
      if (!selectedReactionsTemp[index].isReactedByCurrentUser && isReactedByCurrentUser) {
        selectedReactionsTemp[index].isReactedByCurrentUser = isReactedByCurrentUser;
        selectedReactionsTemp[index].contentReactionId = postReaction.id;
      }
    } else {
      const reaction = allReactions.find(item => item.id === reactionId);
      selectedReactionsTemp.push({
        id: reactionId,
        userId: postReaction.user_id,
        contentReactionId: postReaction.id,
        emoji: reaction && reaction.emoji,
        count: 1,
        isReactedByCurrentUser: isReactedByCurrentUser
      })
    }
  }

  return selectedReactionsTemp;
}

export const getContentReactors = (resData: any) => {

  const allUsers = resData[0].data,
    contentReactions = resData[1].data,
    allReactions = getReactionsFromStore();

  let resultSet = new Set();
  for(const contentReaction of contentReactions) {
    let user = allUsers.find((user: TUser) => user.id === contentReaction.user_id);
    if (user) {
      const reaction = allReactions.find(item => item.id === contentReaction.reaction_id);

      user.emoji = reaction ? reaction.emoji : null;
      resultSet.add(user);
    }
  }

  return resultSet;
}

export const getUpdatedReactions = (reactions: TReactions, reactionPayload: any, shouldAddReaction = false) => {
  const reactionId = reactionPayload && reactionPayload.id;

  if (!reactionId) {
    return []
  };

  const tempReactions = [...reactions],
   contentReactionId = reactionPayload.contentReactionId,
   index = tempReactions.findIndex(item => item.id === reactionId),
   reaction = tempReactions[index],
   emoji = reaction ? reaction.emoji : reactionPayload.emoji;

   const getTempReactions = () => {
      tempReactions[index] = {
        ...reaction,
        count: shouldAddReaction ? reaction.count + 1 : reaction.count -1,
        isReactedByCurrentUser: shouldAddReaction,
        contentReactionId: contentReactionId 
      }

      return tempReactions;
   }

   let updatedReactions = [];

   if (reaction) {
    updatedReactions = getTempReactions();
   } else {
    updatedReactions = shouldAddReaction ?  [...reactions,
      { id: reactionId,
        contentReactionId: contentReactionId,
        emoji,
        count: 1,
        isReactedByCurrentUser: true
    }] : reactions.filter(item => item.id !== reactionId);
  }

   return updatedReactions;
}