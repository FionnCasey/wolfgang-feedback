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

  &:hover {
    background: #FFF;
    color: ${props => (props.secondary ? colour.secondary : colour.primary)};
    border: 1px solid ${props => (props.secondary ? colour.secondary : colour.primary)};
  }
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

export default ({ icon, size, secondary }) => {
  size = size || 30;
  return (
    <Wrapper secondary={secondary} size={`${size + 5}px`}>
      {
        icon === 'like'
          ? <HeartIcon secondary={secondary} size={`${size}px`}/>
          : <ThumbIcon secondary={secondary} size={`${size}px`}/>
      }
    </Wrapper>
  );
};