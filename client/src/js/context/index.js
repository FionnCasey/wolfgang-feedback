import React, { Component } from 'react';
import { api } from '../utils';

const Context = React.createContext();

const NOTIFICATION_LIFESPAN = 5000;

export class ContextProvider extends Component {
	state = {
		user: {
			id: '',
			username: '',
			token: ''
		},
		notifications: [],
		posts: [],
		activePost: {}
	};

	componentWillMount() {
		// Try get user data from session storage and log user in.
		const data = sessionStorage.getItem('wolfganger');
		if (data) {
			const user = JSON.parse(data);
			this.setState({ user });
		}
	}

	loggedIn = () => {
		const { id, username, token } = this.state.user;
		return id && username && token;
	};

	login = user => {
		this.setState({ user });
		sessionStorage.setItem('wolfganger', JSON.stringify(user));
	};

	logout = () => {
		this.setState({
			user: {
				id: '',
				username: '',
				token: ''
			}
		});
		sessionStorage.clear();
	};

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
		if (!this.loggedIn()) {
			this.setNotification('Must be logged in.');
			return;
		}
		console.log('Submit VOte!');
		
		const { id, token } = this.state.user;
		const res = await api.submitVote({
			userId: id,
			value,
			parentId,
			parentIsPost
		}, token);

		if (res.success) {
			let posts = [...this.state.posts];
			posts.splice(posts.findIndex(n => n._id === res.data._id), 1, res.data);
			this.setState({ posts });
			console.log(res.data);

			// Set response as active post if ids match.
			if (this.state.activePost._id === res.data._id) {
				this.setState({ activePost: res.data });
			}
		} else {
			this.setNotification(res.message);
		}
	};

	render() {
		return (
			<Context.Provider value={{
				user: {
					...this.state.user,
					loggedIn: this.loggedIn,
					login: this.login,
					logout: this.logout
				},
				notifications: this.state.notifications,
				setNotification: this.setNotification,
				posts: this.state.posts,
				updatePosts: this.updatePosts,
				submitVote: this.submitVote
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