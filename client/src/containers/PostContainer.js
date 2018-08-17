import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { sortModes, sizes } from '../utils';
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

  async componentDidMount() {
  	try {
  		const res = await fetch('/v1/posts');
  		const json = await res.json();
  		if (json.success) {
        this.props.updatePosts(json.data);
        this.setState({ loading: false });
      }
      else this.setState({ error: json.message });
  	} catch (err) {
  		this.setState({ error: 'Error loading posts.' });
  	}
  }

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
    {({ state, updatePosts }) => {
      return <PostContainer
                {...props}
                posts={state.posts}
                updatePosts={updatePosts}
                />
    }}
  </AppContext.Consumer>
);
