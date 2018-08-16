import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../ContextProvider';
import { countVotes, countChildren, colours, capitaliseWord, formatDate } from '../utils';
import FeatherIcon from 'feather-icons-react';

const Title = styled.h1`
  font-size: 18px;
  color: palevioletred;
  margin: 0 0 2px 0;
`;

const DateText = styled.span`
  font-size: 12px;
  color: ${colours.grey_2}
  margin-left: 10px;
`;

const PostListItemWrapper = styled.li`
  border: 1px solid ${colours.grey_1};
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
  min-height: 70px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  color: ${colours.black}

  &:hover {
    border: 1px solid ${colours.black};
    background: #ffffff;
  }
`;

export default ({ _id, title, _author: { username, image }, createdAt, _votes, _children }) => {
  const { up, down, score, numVotes } = countVotes(_votes);
  return (
    <AppContext.Consumer>
      {({ setViewIndex }) => (
        <PostListItemWrapper key={`post-${_id}`}>
          {capitaliseWord(username)}
          <DateText>{formatDate(createdAt)}</DateText>
          <Title>{title}</Title>
          <FeatherIcon icon='message-square' size={16}/>{ countChildren(_children) } Comments
          <FeatherIcon icon='thumbs-up' size={16}/>{ up || 0 } Likes
          <FeatherIcon icon='thumbs-down' size={16}/>{ down || 0 } Dislikes
        </PostListItemWrapper>
      )}
    </AppContext.Consumer>
  );
};
