import React from 'react';
import styled from 'styled-components';
import { colour } from '../utils';
import { Heart } from 'styled-icons/feather';
import { ThumbDown } from 'styled-icons/material';

const Wrapper = styled.div`
  border-radius: 50%;
  height: ${props => props.size};
  width: ${props => props.size};
  background: ${props => (props.secondary ? colour.secondary : colour.primary)};
  color: #FFF;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s ease-in-out;
  border: 1px solid transparent;
  cursor: pointer;
  visibility: visible;

  &:hover {
    background: #FFF;
    color: ${props => (props.secondary ? colour.secondary : colour.primary)};
    border: 1px solid ${props => (props.secondary ? colour.secondary : colour.primary)};
  }
`;

const Outer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border: 1px solid ${props => (props.secondary ? colour.secondary : colour.primary)};
  background: #FFF;
  visibility: ${props => !props.highlight && 'hidden'};
`;

const HeartIcon = styled(Heart)`
  margin-top: 2px;
  fill: #FFF;

  &:hover {
    fill: ${props => (props.secondary ? colour.secondary : colour.primary)};
  }
`;

const ThumbIcon = styled(ThumbDown)`
  margin-top: 2px;
`;

export default ({ icon, size, secondary, onClick, id, isPost, vote }) => {
  size = size || 30;
  const value = icon === 'like' ? 1 : -1;
  const highlight = vote === value;

  return (
    <Outer highlight={highlight} size={size + 11} secondary={secondary}>
    <Wrapper
      secondary={secondary}
      size={`${size + 5}px`}
      onClick={e => e.stopPropagation() & onClick(id, value, isPost)}
    >
      {
        icon === 'like'
          ? <HeartIcon secondary={secondary} size={`${size}px`} />
          : <ThumbIcon secondary={secondary} size={`${size}px`} />
      }
    </Wrapper>
    </Outer>
  );
};