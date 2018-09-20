import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';

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

class PostList extends Component {
  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (!prevProps.user && user) {
      this.props.fetchPosts(user.token);
    }
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {
            this.props.posts.map(n => <li key={n._id}>{n.title} - Comments: {n._comments.length}</li>)
          }
        </ul>
      </div>
    )
  }
}

PostList.propTypes = {
  user: PropTypes.objectOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  ),
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