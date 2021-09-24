import { getReactions } from "../Reactions/ReactionsApi";

export const getPosts = () => {
  return [{id: 1, content: 'Content 1'},{id: 2, content: 'Content 2'}];
}

export const getReactionsForPost = async() => {
  try {
    const res = await getReactions();  
    return res && res.data ? res.data : [];
  } catch (err) {
    return [];
  }
}