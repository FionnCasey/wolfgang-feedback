import React from 'react';
import styled from 'styled-components';
import { animation } from '../utils';

const Wrapper = styled.div`
  animation:${animation.fadeOut} 1s ease-in forwards;
`;

export default ({ type, message }) => (
  <Wrapper>{ message }</Wrapper>
);
