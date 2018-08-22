import React, { Component } from 'react';
import { api } from '../utils';
import { Notification, PostList } from '../components';
import { withContext } from '../context';

class PostContainer extends Component {
	state = {
		index: -1,
		posts: [],
		error: ''
	};

	async componentDidMount() {
		const { token } = this.props.context.user;
		const res = await api.fetchPosts(token);
		if (res.success) {
			this.setState({ posts: res.data });
		} else {
			this.setState({ error: res.message });
		}
	}

	setViewIndex = index => this.setState({ index });

	render() {
		const { index, posts, error } = this.state;

		return (
			<div>
				{
					index > -1 ?
						'VIEW POST HERE'
						:
						<PostList
							posts={posts}
							setViewIndex={this.setViewIndex}
						/>
				}
				<Notification message={error} />
			</div>
		);
	}
}

export default withContext(PostContainer);
