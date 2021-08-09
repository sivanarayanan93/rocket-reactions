import { TStringOrNumber } from '../common/TCommon';
import Server from '../server';
import { getAllUsers } from '../Users/UsersApi';
import { API_URL, getContentReactors, getSelectedReactions } from './ReactionsModel';

const { REACTIONS,  POST_REACTIONS } = API_URL;
 

export const getReactions = () => {
  return Server.get(`${REACTIONS}`);
}

export const getReactionsByPost = async (postId: TStringOrNumber) => {
  const response = await Server.get(`${POST_REACTIONS}?content_id=${postId}`),
    data = response && response.data;
  
  return getSelectedReactions(data);
}

export const removeReaction = (contentReactionId: TStringOrNumber | undefined) => {
  return Server.delete(`${POST_REACTIONS}/${contentReactionId}`);
}

export const addReaction = ({ id, userId, contentId }: any) => {
  return Server.post(`${POST_REACTIONS}`, {user_id: userId, reaction_id: id, content_id: contentId});
}

export const getContentReactorsByReaction = async (postId: TStringOrNumber, reactionId: TStringOrNumber) => {
  const URL = `${POST_REACTIONS}?content_id=${postId}` + (reactionId === 'ALL' ? '' : `&reaction_id=${reactionId}`);
  const getContentReactorsByReactionPromise = Server.get(URL);
  const resData: Array<any> = await Promise.all([getAllUsers(), getContentReactorsByReactionPromise]);

  return getContentReactors(resData);
}