import { useEffect } from 'react';
import './App.css';
import Posts from './views/Posts';
import { getUserInfo } from './shared/Users/UsersApi';
import { useDispatch, useSelector } from 'react-redux';
import { TReducers } from './reducers';
import styled from 'styled-components';
import COLORS from './shared/colors';
import { getPosts } from './shared/Posts/PostModel';

const Header = styled.h3`
  background-color: ${COLORS.WHITE};
  margin: 0px;
  margin-bottom: 10px;
  padding: 16px;
`

const posts = getPosts();

function App() {
  const dispatch = useDispatch(),
    currentUser = useSelector<TReducers, TReducers["User"]["currentUser"]>(state => state.User.currentUser);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <>
      <Header>Rocket Reactions</Header>
      <div className="App">
        {currentUser.id && <Posts contents={posts}/>}
        {!currentUser.id && <h3>Loading...</h3>}
      </div>
    </>
  );
}

export default App;
