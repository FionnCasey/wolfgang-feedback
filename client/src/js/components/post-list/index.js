import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';
import PostList from './PostList';
import PostListItem from './PostListItem';

const mapStateToProps = state => {
  return {
    user: state.apiState.user,
    posts: state.apiState.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: token => dispatch(apiActions.fetchPosts(token))
  };
};

class PostContainer extends Component {
  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!prevProps.user && user) {
      this.props.fetchPosts(user.token);
    }
  }

  render() {
    return (
      <PostList>
        { this.props.posts.map(post => <PostListItem key={post._id} post={post} />) }
      </PostList>
    )
  }
}

PostContainer.propTypes = {
  user: PropTypes.object,

  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      _author: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      _comments: PropTypes.array,
      _votes: PropTypes.array,
      isResolved: PropTypes.bool.isRequired
    })
  ),
  fetchPosts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);