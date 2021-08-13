import Server from '../server';
import { Dispatch } from 'redux';
import { getReactions } from '../Reactions/ReactionsApi';
import { ACTION_TYPES, API_URL, CONSTANTS } from './UserModel';

const { ADD_USER_INFO } = ACTION_TYPES,
  { GET_ALL_USERS } = API_URL;

/**
 * Get User info
 */
export const getUserInfo = () => {
  return (dispatch: Dispatch) => {
    const currentUserPromise = getCurrentUser(),
    recationsPromise = getReactions();

    Promise.all([currentUserPromise, recationsPromise]).then((res) => {
      dispatch({type: ADD_USER_INFO, payload: { user: res[0].data, reactions: res[1].data}});    
    })
  }
}

/**
 * Get current user
 */
export const getCurrentUser = () => {  
  return Server.get(`${GET_ALL_USERS}/${CONSTANTS.CURRENT_USER_ID}`);
}

/**
 * Get all Users
 */
export const getAllUsers = () => {
  return Server.get(`${GET_ALL_USERS}`)
}