import React, { Component } from 'react';

const UserContext = React.createContext();

class UserProvider extends Component {
	state = {
		id: '',
		username: '',
		token: '',
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
	};

	componentWillMount() {
		const user = sessionStorage.getItem('wolfganger');
		if (user) this.setState({ user });
	}

	render() {
		return (
			<UserContext.Provider value={this.state}>
			{this.props.children}
			</UserContext.Provider>
		);
	}
}

function withUserContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <UserContext.Consumer>
        { context => <Component {...props} user={context}/> }
      </UserContext.Consumer>
    );
  }
}

export { UserProvider, withUserContext };
