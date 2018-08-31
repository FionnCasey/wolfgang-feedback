import React from 'react';
import styled from 'styled-components';
import { animation } from '../utils';

const Wrapper = styled.div`
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || 0};
  background: ${props => props.background || 'white'};
  margin: ${props => props.margin || '0 0 20px 0'};
  padding: ${props => props.padding || '5px'};
  cursor: ${props => props.pointer && 'pointer'};

  animation: ${props => props.fadeIn && `${animation.fadeIn} .3s ease-in-out`};

  &:hover {
    box-shadow: ${props => props.boxShadow || 'none'};
  }
`;

export default props => (
	<Wrapper {...props}>
		{ props.children }
	</Wrapper>
);
