import React from 'react';
import styled from 'styled-components';
import { ArrowBack } from 'styled-icons/material';
import { colours, sizes } from '../utils';

const Wrapper = styled.div`
  border: 1px solid ${colours.grey_1};
  border-radius: ${sizes.border_radius};
  background: ${colours.grey_1};
  padding: 5px;
  width: 100%;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  color: ${colours.black};
  display: inline-block;
`;

const BackButton = styled(ArrowBack)`
  cursor: pointer;
  font-weight: bold;

  &:hover,
  &:active: {
    color: ${colours.wg_green}
  }
`;

export default ({ setViewIndex }) => {

  return (
    <Wrapper>
      <BackButton size={24} onClick={() => setViewIndex(-1)}/>
    </Wrapper>
  );
};
