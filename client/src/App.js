import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { ContextProvider } from './ContextProvider';
import { PostListContainer } from './containers';

export default class App extends Component {
  render() {
    return (
      <ContextProvider>
        <div>
          <PostListContainer />
        </div>
      </ContextProvider>
    );
  }
}
