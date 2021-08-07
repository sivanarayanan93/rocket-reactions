import React from 'react';
import './App.css';
import Posts from './views/posts/Posts'

function App() {
  return (
    <>
      <h3>Rocket Reactions</h3>
      <div className="App">
      <Posts contents={[{id: 1, content: 'Content 1'}, {id: 2, content: 'Content 2'}]}/>
      </div>
    </>
  );
}

export default App;
