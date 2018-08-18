import React, { Component } from 'react';

const AppContext = React.createContext();

class ContextProvider extends Component {

  state = {
    user: {},
    posts: [],
    error: ''
  };

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        updateUser: user => this.setState({ user }),
				updatePosts: posts => this.setState({ posts }),

        updatePost: post => {
          const { posts } = this.state;
          const index = posts.findIndex(n => n._id === post._id);
          if (index) {
            posts.splice(index, 1, post);
            this.setState({ posts });
          } else {
             this.setState({ error: 'Could not find post.' });
          }
        }
      }}>
        { this.props.children }
      </AppContext.Provider>
    );
  }
}

export { AppContext, ContextProvider };
