import { getCurrentUserFromStore, getReactionsFromStore, getAllUsersFromStore } from '../common/CommonModel';
import { TUser } from '../Users/TUsers';
import { TReactions } from './TReactions';

export const API_URL = {
  POST_REACTIONS: '/user_content_reactions',
  REACTIONS: '/reactions'
}

/**
 * get Processed Selected Reactions for the post
 * @param data 
 */

export const getSelelcedReactions = (data: any) => {
  const selectedReactionsTemp: TReactions = [],
    allReactions = getReactionsFromStore(),
    allUsers = getAllUsersFromStore(),
    currentUser = getCurrentUserFromStore();

  for(let postReaction of data) {
    const reactionId = postReaction.reaction_id,
      index = selectedReactionsTemp.findIndex(reaction => reaction.id === reactionId),
      user = allUsers.find(user => user.id === postReaction.user_id);

    if (user) {
      user.name = `${user.first_name} ${user.last_name}`;
    }
    // Finding total count of reactions
    if(index >= 0) {
      if(selectedReactionsTemp[index]) {
        selectedReactionsTemp[index].count += 1;
         

        if (user) {
          selectedReactionsTemp[index].users.push(user);
          if (!selectedReactionsTemp[index].contentReactionId && user.id === currentUser.id) {
            selectedReactionsTemp[index].contentReactionId = postReaction.id;
          }
        }
      }

    } else {
      const reaction = allReactions.find(item => item.id === reactionId);

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

/**
 * 
 * @param resData 
 */
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
    return reactions;
  };

  const tempReactions = [...reactions],
   contentReactionId = reactionPayload.contentReactionId,
   index = tempReactions.findIndex(item => item.id === reactionId),
   reaction = tempReactions[index],
   emoji = reaction ? reaction.emoji : reactionPayload.emoji,
   currentUser = getCurrentUserFromStore();

   // Removing items if count is <= 1 on removing a reaction
   if (!shouldAddReaction && reaction.count <= 1) {
    return reactions.filter(item => item.id !== reactionId);
  }

   const getTempReactions = () => {
      // Updating existing reaction's count to the state 
      tempReactions[index] = {
        ...reaction,
        count: shouldAddReaction ? reaction.count + 1 : reaction.count - 1,
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