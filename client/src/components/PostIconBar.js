import React from 'react';
import styled from 'styled-components';
import { countChildren } from '../utils';
import { Comment } from 'styled-icons/octicons';

const Wrapper = styled.div`
  display: inline-block;
  font-size: 14px;
  margin: 6px 0 2px 0;
`;

export default ({ children }) => {
  return (
    <Wrapper>
      <Comment size={16}/> { countChildren(children) } Comments
    </Wrapper>
  );
};
