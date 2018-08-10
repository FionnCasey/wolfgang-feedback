import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import NavBar from './components/NavBar';
import PostList from './components/PostList';

import data from './testing/data';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <PostList posts={data} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
