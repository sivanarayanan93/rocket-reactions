import { TStringOrNumber } from '../common/TCommon';
import Server from '../server';
import { API_URL } from './ReactionsModel';

const { REACTIONS,  POST_REACTIONS } = API_URL;
 

export const getReactions = () => {
  return Server.get(`${REACTIONS}`);
}

/**
 * Get Reactions for post
 * @param postId 
 */
export const getReactionsByPost = async (postId: TStringOrNumber) => {
  try {
    const response = await Server.get(`${POST_REACTIONS}?content_id=${postId}`);

    return response && response.data ? response.data : [];
  } catch (err) {
    return [];
  }
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