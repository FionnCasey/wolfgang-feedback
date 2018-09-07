import React, { Component } from 'react';
import api from '../utils';

const Context = React.createContext();

const NOTIFICATION_LIFESPAN = 5000;

class ContextProvider extends Component {
	state = {
		user: {
			id: '',
			username: '',
			token: ''
		},
		notifications: [],
		posts: []
	};

	componentWillMount() {
		// Try get user data from session storage and log user in.
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

	setNotification = message => {
		const notifications = this.state.notifications.concat([message]);
		this.setState({ notifications });
		setTimeout(() => {
			const notifications = this.state.notifications.slice(0, 1);
			this.setState({ notifications });
		}, NOTIFICATION_LIFESPAN);
	};

	updatePosts = async () => {
		try {
			const { token } = this.state.user;
			const res = await api.fetchPosts(token);
			if (res.success) {
				this.setState({ posts: res.data });
			} else {
				this.setNotification(res.message);
			}
		} catch (err) {
			this.setNotification(err);
		}
	};

	submitVote = async (parentId, value, parentIsPost) => {
		const { id, token } = this.state.user;

		// Exit if no user values.
		if (!id || !token) {
			this.setNotification('Must be logged in.');
			return;
		}

		const res = await api.submitVote({
			userId: id,
			value,
			parentId,
			parentIsPost
		});

		if (res.success) {
			
		} else {
			this.setNotification(res.message);
		}
	};

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
							id: user.id,
							username: user.username,
							token: user.token
						}
						this.setState({ user: newUser });
						sessionStorage.setItem('wg_id', user.id);
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
				notifications: this.state.notifications,
				setNotification: this.setNotification,
				posts: this.state.posts,
				updatePosts: this.updatePosts
			}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export default function withContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <Context.Consumer>
        { context => <Component {...props} context={context}/> }
      </Context.Consumer>
    );
  }
}