import React from 'react';
import styled from 'styled-components';
import { colours, capitaliseWord, formatDate, sizes, box_shadow, animation } from '../utils';
import { Title, SmallText } from './Generics';
import PostIconBar from './PostIconBar';

const Wrapper = styled.li`
  border: 1px solid ${colours.greyscale[1]};
  border-radius: ${sizes.border_radius};
  background: ${colours.greyscale[0]};
  margin-bottom: 2px;
  padding: 5px 5px 0 5px;
  cursor: pointer;
  min-height: 70px;
  box-shadow: ${box_shadow};
  color: ${colours.greyscale[6]};

  animation: ${animation.fadeIn} .3s ease-in-out;

  &:hover {
    border: 1px solid ${colours.greyscale[6]};
  }
`;

const Info = styled.div`
  display: inline-block;
  width: 100%;
  color: ${colours.greyscale[4]};
`;

export default ({ post, index, setViewIndex }) => {
  const { title, _author: { username }, createdAt, _votes, _children } = post;

  return (
    <Wrapper onClick={() => setViewIndex(index)} i={index}>
      <Title>{title}</Title>
      <Info>
        { capitaliseWord(username) }
        <SmallText>{ formatDate(createdAt) }</SmallText>
      </Info>
      <PostIconBar children={_children} votes={_votes}/>
    </Wrapper>
  );
};
