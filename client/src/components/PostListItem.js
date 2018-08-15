import React from 'react';
import styled from 'styled-components';

import { countVotes } from '../utils';

const Title = styled.h1`
  font-size: 18px;
  color: palevioletred;
`;

const PostListItemWrapper = styled.li`
  border: 1px solid black;
  margin-bottom: 5px;
  padding: 5px;
  width: 100%;
`;

export default ({ _id, title, _votes }) => {
  const { up, down, score, numVotes } = countVotes(_votes);
  return (
    <PostListItemWrapper key={`post-${_id}`}>
      <Title>{ title }</Title>
      Up: { up || 0 } Down: { down || 0 } Score: { score || 0 } Votes: { numVotes || 0 }
    </PostListItemWrapper>
  );
};
