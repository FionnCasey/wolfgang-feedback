import React from 'react';
import styled from 'styled-components';
import { countChildren } from '../utils';
import { Comment } from 'styled-icons/octicons';
import { ThumbUp, ThumbDown } from 'styled-icons/material';
import { sizes, colours } from '../utils';

const Wrapper = styled.div`
  display: inline-block;
  font-size: 14px;
  margin: 6px 0 2px 0;
  width: 100%;
`;

const Like = styled(ThumbUp)`
  position: relative;
  top: -2px;
  color: ${colours.grey_4};
  margin-left: ${sizes.icon_gap};
  cursor: pointer;
`;

const likeCss = `&:hover { color: ${colours.orange}; }`;

const Dislike = styled(ThumbDown)`
  position: relative;;
  color: ${colours.grey_4};
  margin-left: 5px;
  cursor: pointer;
`;

const dislikeCss = `&:hover { color: ${colours.blue}; }`;

export default ({ children, showChildren }) => {
  const replies = countChildren(children);
  const text = replies === 1 ? '1 Reply' : `${replies} Replies`;
  return (
    <Wrapper>
      <Comment size={16}/> {text}
      <Like size={16} css={likeCss}/>
      <Dislike size={16} css={dislikeCss}/>
    </Wrapper>
  );
};
