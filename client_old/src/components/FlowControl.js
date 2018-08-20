import React from 'react';
import styled from 'styled-components';
import { ArrowBack, Refresh } from 'styled-icons/material';
import { colours, sizes, box_shadow, animation } from '../utils';

const Wrapper = styled.div`
  border: 1px solid ${colours.greyscale[1]};
  border-radius: ${sizes.border_radius};
  background: ${colours.greyscale[0]};
  padding: 5px;
  width: 100%;
  box-shadow: ${box_shadow};
  color: ${colours.greyscale[4]};
  display: inline-block;
`;

const BackButton = styled(ArrowBack)`
  cursor: pointer;

  &:hover {
    color: ${colours.secondary[0]};
    animation: ${animation.slideFadeLeft} 0.5s ease-out;
  }
`;

const RefreshButton = styled(Refresh)`
  cursor: pointer;
  float: right;

  &:hover {
    color: ${colours.secondary[0]};
    animation: ${animation.rotate} .75s ease-out;
  }
`;

const LoadingWrapper = styled.div`
  float: right;
`;

export default ({ setViewIndex, update, loading, showBack }) => {

  return (
    <Wrapper>
      { showBack && <BackButton size={24} onClick={() => setViewIndex(-1)}/> }
      <RefreshButton size={24} onClick={update}/>
    </Wrapper>
  );
};
