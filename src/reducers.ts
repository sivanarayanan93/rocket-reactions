import { combineReducers } from 'redux';
import { TUsersReducer } from './shared/Users/TUsers';
import  UserReducer from './shared/Users/UsersReducer';


export type TReducers = {
  User: TUsersReducer
}

const Reducers = combineReducers({
  User: UserReducer
})

export default Reducers;