import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  background: white;
  margin-bottom: 2px;
  padding: 5px;
  min-height: 70px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.2);
`;

export default props => (
	<Wrapper>
		{ props.children }
	</Wrapper>
);
