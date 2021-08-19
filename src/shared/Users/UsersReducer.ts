import { TAction } from "../common/TCommon";
import { TUser, TUsersReducer } from "./TUsers"
import { ACTION_TYPES } from "./UserModel";

const initState:TUsersReducer = {
  currentUser: {} as TUser,
  users: [] as TUser[],
  reactions: []
}

const { ADD_USER_INFO } = ACTION_TYPES;

const UserReducer = (state:TUsersReducer = initState, action:TAction) => {
  switch(action.type) {
    case ADD_USER_INFO:
      return { ...state,
        currentUser: action.payload.currentUser, users: [...state.users, ...action.payload.users], reactions: [...state.reactions, ...action.payload.reactions]
      }

      default:
        return state;
  }
}

export default UserReducer;