import React, { Component } from 'react';

const AppContext = React.createContext();

class ContextProvider extends Component {

  state = {
    user: {
      _id: '',
      username: '',
      token: '',
      loggedIn: false
    },
    posts: [],
    error: ''
  };

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,

        login: user => this.setState({ user }),

        logout: () => {
          this.setState({
            user: {
              _id: '',
              username: '',
              token: '',
              loggedIn: false
            },
            posts: [],
            error: ''
          });
        },

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
