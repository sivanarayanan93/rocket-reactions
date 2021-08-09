import { useEffect } from 'react';
import './App.css';
import Posts from './views/posts';
import { getUserInfo } from './shared/Users/UsersApi';
import { useDispatch, useSelector } from 'react-redux';
import { TReducers } from './reducers';
import styled from 'styled-components';

const Header = styled.h3`
  background-color: #fff;
  margin: 0px;
  margin-bottom: 10px;
  padding: 16px;
`

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
        {currentUser.id && <Posts contents={[{id: 1, content: 'Content 1'},{id: 2, content: 'Content 2'}]}/>}
        {!currentUser.id && <h3>Loading...</h3>}
      </div>
    </>
  );
}

export default App;
