import React, { Component } from 'react';

import { AppContext } from '../ContextProvider';
import { ListWrapper, PostListItem } from '../components';

class PostListContainer extends Component {

  async componentDidMount() {
  	try {
  		const res = await fetch('/v1/posts');
  		const json = await res.json();
  		this.props.updatePosts(json);
  	} catch (err) {
  		this.props.throwError('Error loading posts.');
  	}
  }

  render() {
    const { posts, error } = this.props;

    return (
      <ListWrapper>
        {posts.map(PostListItem)}
        <li>{ error }</li>
      </ListWrapper>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {({ state, updatePosts, throwError }) => {
      return <PostListContainer {...props}
                posts={state.posts}
                error={state.error}
                updatePosts={updatePosts}
                throwError={throwError}
                />
    }}
  </AppContext.Consumer>
);
