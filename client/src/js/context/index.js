import React, { Component } from 'react';

const Context = React.createContext();

class ContextProvider extends Component {
	state = {
		user: {
			id: '',
			username: '',
			token: ''
		},
		notifications: []
	};

	componentWillMount() {
		const id = sessionStorage.getItem('wg_id');
		const username = sessionStorage.getItem('wg_user');
		const token = sessionStorage.getItem('wg_token');
		if (id && username && token) this.setState({
			user: {
				id,
				username,
				token
			}
		});
	}

	render() {
		return (
			<Context.Provider value={{
				user: {
					...this.state.user,
					loggedIn: () => {
						const { id, username, token } = this.state.user;
						return id && username && token;
					},
					login: user => {
						const newUser = {
							id: user._id,
							username: user.username,
							token: user.token
						}
						this.setState({ user: newUser });
						sessionStorage.setItem('wg_id', user._id);
						sessionStorage.setItem('wg_user', user.username);
						sessionStorage.setItem('wg_token', user.token);
					},
					logout: () => {
						this.setState({
							user: {
								id: '',
								username: '',
								token: ''
							}
						});
						sessionStorage.clear();
					}
				},
				notifications: this.state.notifications
			}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

function withContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <Context.Consumer>
        { context => <Component {...props} context={context}/> }
      </Context.Consumer>
    );
  }
}

export { ContextProvider, withContext };
