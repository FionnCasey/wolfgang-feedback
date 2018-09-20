import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';
import PostListItem from './PostListItem';
import { Grid } from 'styled-grid-responsive';

const mapStateToProps = state => {
  return {
    user: state.apiState.user,
    posts: state.apiState.posts,
    activePostId: state.viewState.activePostId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: token => dispatch(apiActions.fetchPosts(token))
  };
};

class PostList extends Component {
  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!prevProps.user && user) {
      this.props.fetchPosts(user.token);
    }
  }

  render() {
    const { posts, setActivePostId } = this.props;

    return (
      <Grid center>
        { 
          posts.map(post => (
            <PostListItem
              key={post._id} 
              post={post} 
              onClick={setActivePostId}
            />
          ))
        }
      </Grid>
    )
  }
}

PostList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);