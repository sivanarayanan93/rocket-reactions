import Server from '../server';
import { TUser } from './TUsers';
import { API_URL, CONSTANTS } from './UserModel';

const { GET_ALL_USERS } = API_URL;

/**
 * Get all Users
 */
export const getAllUsers = () => {
  return Server.get(`${GET_ALL_USERS}`)
}

/**
 * Get User info
 */
export const getUserInfo = async() => { 
  try {
    const res = await getAllUsers();

    if (res && res.data) {
      let users = res.data;

      users.forEach((user: TUser) => {
        user.name = `${user.first_name} ${user.last_name}`
      });

      const currentUser = res.data.find((user: TUser) => user.id === CONSTANTS.CURRENT_USER_ID);
      
      return { users, currentUser };
    }
  } catch(err) {
    return { users: [], currentUser: {}, error: err}
  }
}