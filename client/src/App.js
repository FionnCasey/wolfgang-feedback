import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import {PostContainer} from './views/PostContainer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }
  
  render() {
    return (
      <div>
        <PostContainer />
      </div>
    );
  }
}
