import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './views/Posts';
import styled from 'styled-components';
import COLORS from './shared/colors';
import { getPosts } from './shared/Posts/PostModel';
import { TUser } from './shared/Users/TUsers';
import { getUserInfo } from './shared/Users/UsersApi';

const Header = styled.h3`
  background-color: ${COLORS.WHITE};
  margin: 0px;
  margin-bottom: 10px;
  padding: 16px;
`

const posts = getPosts();

export type TAppContext= {
  users: TUser[],
  currentUser: TUser,
  error?: string
}

const initAppContextValue = { users: [] as TUser[], currentUser: {} as TUser}

export const AppContext = React.createContext<TAppContext>(initAppContextValue);

function App() {
  const [userInfo, setUserInfo] = useState(initAppContextValue),
    [status, setStatus] = useState('');
  useEffect(() => {
    setStatus('LOADING');
    getUserInfo().then((data) => {
      if (data && data.error) {
        setStatus('ERROR');
      } else {
        setUserInfo(data as TAppContext);
        setStatus('');
      }
    })
  }, []);

  return (
    <>
      <Header>Rocket Reactions</Header>
      <div className="App">
        {!status && <AppContext.Provider value={userInfo}>
          {userInfo.currentUser.id && <Posts contents={posts} showReactions/>}
          </AppContext.Provider>
        }

        {status && <h3>{status === 'LOADING' ? 'Loading...' : 'Something went wrong. Please refresh again'}</h3>}
      </div>
    </>
  );
}

export default App;
