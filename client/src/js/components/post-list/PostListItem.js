import React from 'react';
import { Col } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Post = styled.div`
  background: palevioletred;
`;

const PostListItem = props => {
  const { _id, title, text } = props.post;

  return (
    <Col sm='3' md='3'>
      <Post>
        <h2>{ title }</h2>
        <p>{ text }</p>
      </Post>
    </Col>
  );
};

PostListItem.propTypes = {
  post: PropTypes.object
};

export default PostListItem;