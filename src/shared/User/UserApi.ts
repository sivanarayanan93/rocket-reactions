import Server from '../server';
import store from '../../store';
import { Dispatch } from 'redux';
import { User } from '../types/User';

const currentUserId = 4,
  GET_ALL_USERS = '/users',
  REACTIONS = '/reactions',
  POST_REACTIONS = '/user_content_reactions';

export const getUserInfo = () => {
  return (dispatch: Dispatch) => {
    const currentUserPromise = getCurrentUser(),
    recationsPromise = getReactions();

    Promise.all([currentUserPromise, recationsPromise]).then((res) => {
      dispatch({type: 'ADD_USER_INFO', payload: { user: res[0].data, reactions: res[1].data}});    
    })
  }
}

export const getCurrentUser = () => {  
  return Server.get(`${GET_ALL_USERS}/${currentUserId}`);
}

export const getReactions = () => {
  return Server.get(`${REACTIONS}`);
}

export const getReactionsByPost = async (postId: string | number) => {
  const response = await Server.get(`${POST_REACTIONS}?content_id=${postId}`),
    data = response && response.data;

    const selectedReactionsTemp = [],
      currentUser = getCurrentUserFromStore();
    
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
        selectedReactionsTemp.push({
          id: reactionId,
          userId: postReaction.user_id,
          contentReactionId: postReaction.id,
          count: 1,
          isReactedByCurrentUser: isReactedByCurrentUser
         })
      }
    }
  
    return selectedReactionsTemp;
}

export const getAllUsers = () => {
  return Server.get(`${GET_ALL_USERS}`)
}

export const getContentReactorsByReaction = async (postId: string | number, reactionId: string | number) => {
  const URL = `${POST_REACTIONS}?content_id=${postId}` + (reactionId === 'ALL' ? '' : `&reaction_id=${reactionId}`);
  const getContentReactorsByReactionPromise = Server.get(URL);
  const resData: Array<any> = await Promise.all([getAllUsers(), getContentReactorsByReactionPromise]),
    allUsers = resData[0].data,
    contentReactions = resData[1].data,
    allReactions = getReactionsFromStore();


  
  let resultSet = new Set();
  for(const contentReaction of contentReactions) {
    let user = allUsers.find((user: User) => user.id === contentReaction.user_id);
    if (user) {
      const reaction = allReactions.find(item => item.id === contentReaction.reaction_id);

      user.emoji = reaction ? reaction.emoji : null;
      resultSet.add(user);
    }
  }

  return resultSet;
}

export const removeReaction = (contentReactionId: string | number | undefined) => {
  return Server.delete(`${POST_REACTIONS}/${contentReactionId}`);
}

export const addReaction = ({ id, userId, contentId }: any) => {
  return Server.post(`${POST_REACTIONS}`, {user_id: userId, reaction_id: id, content_id: contentId});
}

const getReactionsFromStore = () => {
  const state = getAppState();

  return state && state.User.reactions || [];
}

const getAppState = () => store.getState();

const getCurrentUserFromStore = () => {
  const state = getAppState();
  return state && state.User.currentUser || {};
}