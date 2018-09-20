import React from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Post = styled.div`
  cursor: pointer;
  background: palevioletred;
`;

const PostListItem = ({ _id, title, text }) => {
  return (
    <GridItem col={1/4} media={{ phone: 1, tablet: 1/3 }}>
      <Post onClick={e => e.stopPropagation() & onClick(_id)}>
        <h2>{ title }</h2>
        <p>{ text }</p>
      </Post>
    </GridItem>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _author: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired
};

export default PostListItem;