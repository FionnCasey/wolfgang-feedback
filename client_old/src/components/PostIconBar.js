import React from 'react';
import styled from 'styled-components';
import { countChildren, colours, sizes, animation } from '../utils';
import { Comment } from 'styled-icons/octicons';
import { ThumbUp, ThumbDown } from 'styled-icons/material';

const Wrapper = styled.div`
  display: inline-block;
  font-size: 14px;
  margin: 6px 0 2px 0;
`;

const Like = styled(ThumbUp)`
  position: relative;
  top: -2px;
  color: ${colours.greyscale[3]};
  margin-left: ${sizes.icon_gap};
  cursor: pointer;

  &:hover {
    color: ${colours.orange[0]};
    animation: ${animation.pulse} .5s ease-out;
  }
`;

const Dislike = styled(ThumbDown)`
  position: relative;
  top: 1px;
  color: ${colours.greyscale[3]};
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: ${colours.blue[0]};
    animation: ${animation.pulse} .5s ease-out;
  }
`;

export default ({ children, isMainView }) => {
  const text = countChildren(children) === 1 ? 'Comment' : 'Comments';
  return (
    <Wrapper>
      <Comment size={16}/> { countChildren(children) } { text }
      {isMainView && <React.Fragment><Like size={17} /><Dislike size={17} /></React.Fragment> }
    </Wrapper>
  );
};
