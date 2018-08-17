import React from 'react';
import styled from 'styled-components';
import { colours, capitaliseWord, formatDate, sizes } from '../utils';
import { Title, SmallText } from './Generics';
import PostIconBar from './PostIconBar';

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

const Info = styled.div`
  display: inline-block;
  width: 100%;
  color: ${colours.grey_2};
`;

export default ({ post, index, setViewIndex }) => {
  const { title, _author: { username }, createdAt, _votes, _children } = post;

  return (
    <Wrapper onClick={() => setViewIndex(index)}>
      <Title>{title}</Title>
      <Info>
        { capitaliseWord(username) }
        <SmallText>{ formatDate(createdAt) }</SmallText>
      </Info>
      <PostIconBar children={_children} votes={_votes}/>
    </Wrapper>
  );
};
