import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || 0};
  background: ${props => props.background || 'white'};
  margin: 0 0 20px 0;
  padding: ${props => props.padding || '5px'};
  cursor: pointer;

  &:hover {
    box-shadow: ${props => props.boxShadow || 'none'};
  }
`;

export default props => (
	<Wrapper {...props}>
		{ props.children }
	</Wrapper>
);
