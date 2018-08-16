import React, { Component } from 'react';

const AppContext = React.createContext();

class ContextProvider extends Component {

  state = {
    user: null,
    viewIndex: -1,
    posts: [],
    error: ''
  };

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,

				updatePosts: res => {
					if (res.success) this.setState({ posts: res.data, error: '' });
					else this.setState({ error: res.message });
				},

        setViewIndex: viewIndex => this.setState({ viewIndex }),

				throwError: error => this.setState({ error })
      }}>
        { this.props.children }
      </AppContext.Provider>
    );
  }
}

export { AppContext, ContextProvider };
