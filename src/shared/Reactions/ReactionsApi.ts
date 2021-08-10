import { TStringOrNumber } from '../common/TCommon';
import Server from '../server';
import { getAllUsers } from '../Users/UsersApi';
import { API_URL, getContentReactors, getSelelcedReactions } from './ReactionsModel';

const { REACTIONS,  POST_REACTIONS } = API_URL;
 

export const getReactions = () => {
  return Server.get(`${REACTIONS}`);
}

/**
 * Get Reactions for post
 * @param postId 
 */
export const getReactionsByPost = async (postId: TStringOrNumber) => {
  const response = await Server.get(`${POST_REACTIONS}?content_id=${postId}`),
    data = response && response.data;
  
  return getSelelcedReactions(data);
}

/**
 * Delete Reaction
 * @param contentReactionId 
 */
export const deleteReaction = (contentReactionId: TStringOrNumber | undefined) => {
  return Server.delete(`${POST_REACTIONS}/${contentReactionId}`);
}

/**
 * Add reaction to the content
 * @param { id, userId, contentId } 
 */
export const addReaction = ({ id, userId, contentId }: any) => {
  return Server.post(`${POST_REACTIONS}`, {user_id: userId, reaction_id: id, content_id: contentId});
}

/**
 * Get Reactors of the content for a specific reacitions
 * @param postId 
 * @param reactionId 
 */
export const getContentReactorsByReaction = async (postId: TStringOrNumber, reactionId: TStringOrNumber) => {
  const URL = `${POST_REACTIONS}?content_id=${postId}` + (reactionId === 'ALL' ? '' : `&reaction_id=${reactionId}`);
  const getContentReactorsByReactionPromise = Server.get(URL);
  const resData = await Promise.all([getAllUsers(), getContentReactorsByReactionPromise]);

  return getContentReactors(resData);
}