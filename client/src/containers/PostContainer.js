import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { sortModes, sizes } from '../utils';
import { PostListItem } from '../components';

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

  render() {
    const { sortingMode, loading, error } = this.state;
    const { posts } = this.props;

    return (
      <Wrapper>
        {
          loading ?
            'Loading' :
            posts.map(PostListItem).sort(sortingMode)
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
