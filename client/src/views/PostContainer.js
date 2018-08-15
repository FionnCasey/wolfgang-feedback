import React, { Component } from 'react';

import PostPreview from '../components/PostPreview';

export class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      posts: [],
      message: ''
    };
  }

  componentWillMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const res = await fetch('/v1/posts');
      const json = await res.json();
      if (json.success) {
        this.setState({ posts: json.data });
      } else {
        this.setState({ message: json.message });
      }
    } catch(err) {
      console.log(err);
      this.setState({ message: 'An error occured while fetching posts. '});
    }
  };

  render() {
    const { posts } = this.state;
    const Posts = posts.map(PostPreview);
    return(
      <ul>
        {Posts}
      </ul>
    );
  }
}
