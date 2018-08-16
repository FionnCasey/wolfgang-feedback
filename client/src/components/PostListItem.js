import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../libs';
import { countVotes, countChildren, colours, capitaliseWord, formatDate, sizes } from '../utils';

const Title = styled.h1`
  font-size: 18px;
  color: palevioletred;
  margin: 0 0 2px 0;
`;

const DateText = styled.span`
  font-size: 12px;
  color: ${colours.grey_2};
  margin-left: 10px;
`;

const Wrapper = styled.li`
  border: 1px solid ${colours.grey_1};
  border-radius: ${sizes.border_radius};
  background: ${colours.grey_1};
  margin-bottom: 2px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
  min-height: 70px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  color: ${colours.black};

  &:hover {
    border: 1px solid ${colours.black};
    background: #ffffff;
  }
`;

export default ({ _id, title, _author: { username, image }, createdAt, _votes, _children }) => {
  const { up, down, score, numVotes } = countVotes(_votes);
  console.log(_id);
  return (
    <AppContext.Consumer key={`post-${_id}`}>
      {({ setViewIndex }) => (
        <Wrapper>
          <Title>{title}</Title>
          {capitaliseWord(username)}
          <DateText>{formatDate(createdAt)}</DateText>
        </Wrapper>
      )}
    </AppContext.Consumer>
  );
};
