import React from 'react';
import styled from 'styled-components';
import { Comment } from 'styled-icons/octicons';
import { ThumbUp, ThumbDown } from 'styled-icons/material';
import { sizes, colours, animation } from '../utils';

const Wrapper = styled.div`
  display: inline-block;
  font-size: 14px;
  margin: 6px 0 2px 0;
  width: 100%;
  colour: ${colours.greyscale[6]};
`;

const Like = styled(ThumbUp)`
  position: relative;
  top: -2px;
  color: ${props => props.colour};
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
  color: ${props => props.colour};
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: ${colours.blue[0]};
    animation: ${animation.pulse} .5s ease-out;
  }
`;

export default ({ children, showChildren, voteValue, submitVote }) => {
  const text = children.length === 1 ? '1 Reply' : `${children.length} Replies`;
  return (
    <Wrapper>
      <Comment size={16}/> {text}
      <Like
        size={17}
        onClick={() => submitVote(1)}
        colour={voteValue === 1 ? colours.orange[0] : colours.greyscale[3]}
       />
      <Dislike
        size={17}
        onClick={() => submitVote(-1)}
        colour={voteValue === -1 ? colours.blue[0] : colours.greyscale[3]}
      />
    </Wrapper>
  );
};
