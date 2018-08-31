import React, { Component } from 'react';
import { api } from '../utils';
import { Notification, PostList, Post } from '../components';
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

	submitVote = async (_id, value, isPost) => {
		const { id, token } = this.props.context.user;
		if (!id || !token) {
			console.log('Must be logged in.');
			// TODO: Handle this.
			//return;
		}

		const res = await api.submitVote({
			userId: id,
			token,
			parentId: _id,
			parentIsPost: isPost,
			value
		});
		if (res.success) {
			const { posts } = this.state;
			const updated = posts.map(n => n._id === res.data._id ? res.data : n);
			this.setState({ posts: updated }, () => console.log('updated'));
		}
	};

	render() {
		const { index, posts, error } = this.state;

		return (
			<div>
				{
					index > -1 ?
						<Post
							post={posts[index]}
							submitVote={this.submitVote}
						/>
						:
						<PostList
							posts={posts}
							submitVote={this.submitVote}
							setViewIndex={this.setViewIndex}
						/>
				}
				<Notification message={error} />
			</div>
		);
	}
}

export default withContext(PostContainer);
