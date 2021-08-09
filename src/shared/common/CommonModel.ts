import store from '../../store';

export const getReactionsFromStore = () => {
  const state = getAppState();

  return state ? state.User.reactions : [];
}

const getAppState = () => store.getState();

export const getCurrentUserFromStore = () => {
  const state = getAppState();
  return state ? state.User.currentUser : {};
}