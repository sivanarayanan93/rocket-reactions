import Server from '../server';
import { Dispatch } from 'redux';
import { getReactions } from '../Reactions/ReactionsApi';
import { ACTION_TYPES, API_URL, CONSTANTS } from './UserModel';
import { TUser } from './TUsers';

const { ADD_USER_INFO } = ACTION_TYPES,
  { GET_ALL_USERS } = API_URL;

/**
 * Get User info
 */
export const getUserInfo = () => {
  return (dispatch: Dispatch) => {
    const allUsersPromise = getAllUsers(),
    recationsPromise = getReactions();

    Promise.all([allUsersPromise, recationsPromise]).then((res) => {
      const currentUser = res[0].data ? res[0].data.find((user: TUser) => user.id === CONSTANTS.CURRENT_USER_ID) : {};
      
      dispatch({type: ADD_USER_INFO, payload: { users: res[0].data, currentUser, reactions: res[1].data}});    
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