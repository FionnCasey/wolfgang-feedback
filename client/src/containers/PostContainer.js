import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { sortModes, sizes, api } from '../utils';
import { Post, PostListItem } from '../components';

const Wrapper = styled.div`
  padding: ${sizes.top} 0 0 ${sizes.sides};

  @media (max-width: 1160px) {
		padding: 10px 0 0 15px;
	}
  @media (max-width: 768px) {
   padding: 5px;
 }
`;

class PostContainer extends Component {
  state = {
    loading: true,
    viewIndex: -1,
    sortingMode: sortModes.none,
    error: ''
  };

  componentDidMount() {
  	 this.updatePosts();
  }

  updatePosts = () => {
    this.setState({ loading: true });
    const { user } = this.props;
    api.fetchPosts(user)
      .then(data => {
        this.props.updatePosts(data);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  updatePost = id => {
    this.setState({ loading: true });
    const { user } = this.props;
    api.fetchPost(id, user)
      .then(data => {
        this.props.updatePost(data);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  setViewIndex = viewIndex => this.setState({ viewIndex });

  render() {
    const { sortingMode, loading, viewIndex, error } = this.state;
    const { posts } = this.props;

    return (
      <Wrapper>
        {
          loading ?
            'Loading' :
            viewIndex > -1 ?
            <Post
              post={posts[viewIndex]}
              setViewIndex={this.setViewIndex}
              updatePost={this.updatePost}
            />
            :
            posts.sort(sortingMode).map((n, i) => (
              <PostListItem
                post={n}
                index={i}
                setViewIndex={this.setViewIndex}
                key={`post-${n._id}`}
              />
            ))
        }
        <p>{ error }</p>
      </Wrapper>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {({ state, updatePosts, updatePost }) => {
      return <PostContainer
                {...props}
                user={state.user}
                posts={state.posts}
                updatePosts={updatePosts}
                updatePost={updatePost}
                />
    }}
  </AppContext.Consumer>
);
