import React, { Component } from 'react';

const Context = React.createContext();

class ContextProvider extends Component {
	state = {
		user: {
			id: '5b7a7e0498ecdbfa1e49d118',
			username: '',
			token: ''
		},
		notifications: []
	};

	componentWillMount() {
		const user = sessionStorage.getItem('wolfganger');
		if (user) this.setState({
			user: {
				id: user.id,
				username: user.username,
				token: user.token
			}
		});
	}

	render() {
		return (
			<Context.Provider value={{
				user: {
					...this.state.user,
					loggedIn: () => {
						const { id, username, token } = this.state;
						return id && username && token;
					},
					login: user => {
						this.setState({ user });
						sessionStorage.setItem('wolfganger', user);
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
