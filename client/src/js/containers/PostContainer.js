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
		await this.updatePosts();
	}

	async updatePosts() {
		try {
			const { token } = this.props.context.user;
			const res = await api.fetchPosts(token);
			if (res.success) {
				this.setState({ posts: res.data });
			} else {
				this.setState({ error: res.message });
				console.log(res.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	setViewIndex = index => {
		this.setState({ index });
		window.scrollTo(0, 0);
	};

	submitVote = async (_id, value, isPost) => {
		const { id, token } = this.props.context.user;
		if (!id || !token) {
			console.log('Must be logged in.');
			// TODO: Handle this.
			return;
		}

		const { index, posts } = this.state;
		let savedId;
		if (index > -1) {
			savedId = posts[index]._id;
		}

		

		const res = await api.submitVote({
			userId: id,
			parentId: _id,
			parentIsPost: isPost,
			value
		}, token);
		if (res.success) {
			await this.updatePosts();
			if (savedId) {
				const viewIndex = this.state.posts.findIndex(n => n._id === savedId);
				this.setState({ index: viewIndex });
			}
		} else {
			console.log(res.message);
		}
	};

	submitComment = async (_id, text) => {
		const { id, token } = this.props.context.user;
		if (!id || !token) {
			console.log('Must be logged in.');
			// TODO: Handle this.
			return;
		}

		const res = await api.createComment({
			userId: id,
			parentId: _id,
			parentIsPost: true,
			text
		}, token);
		if (res.success) {
			await this.updatePosts();
			const index = this.state.posts.findIndex(n => n._id === res.data._id);
			this.setState({ index });
		} else {
			console.log(res.message);
		}
	};

	render() {
		const { index, posts, error } = this.state;
		const { setView } = this.props;

		return (
			<div>
				{
					index > -1 ?
						<Post
							post={posts[index]}
							submitVote={this.submitVote}
							submitComment={this.submitComment}
							back={() => this.setViewIndex(-1)}
						/>
						:
						<PostList
							setView={setView}
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
