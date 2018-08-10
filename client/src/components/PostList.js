import React from 'react';
import PropTypes from 'prop-types';

import PostPreview from './PostPreview';

const PostList = props => {
  const posts = props.posts.map(post => {
    return (
      <PostPreview key={post._id}
            title={post.title}
            author={post.author}
            numComments={post.numComments}
            upvotes={post.upvotes}
            downvotes={post.downvotes} />
          );
  });

  return (
    <div>{ posts }</div>
  );
};

PostList.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  numComments: PropTypes.number,
  upvotes: PropTypes.upvotes,
  downvotes: PropTypes.downvotes
};

export default PostList;
