import React, { Component } from 'react';

const AppContext = React.createContext();

class ContextProvider extends Component {

  state = {
    user: {},
    posts: []
  };

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        updateUser: user => this.setState({ user }),
				updatePosts: posts => this.setState({ posts })
      }}>
        { this.props.children }
      </AppContext.Provider>
    );
  }
}

export { AppContext, ContextProvider };
