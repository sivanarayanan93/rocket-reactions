import Server from '../server';
import { Dispatch } from 'redux';
import { getReactions } from '../Reactions/ReactionsApi';

const currentUserId = 4,
  GET_ALL_USERS = '/users';


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

export const getAllUsers = () => {
  return Server.get(`${GET_ALL_USERS}`)
}