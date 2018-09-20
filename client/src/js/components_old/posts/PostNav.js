import React from 'react';
import styled from 'styled-components';
import { Home } from 'styled-icons/material';
import { colour } from '../../utils';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 15px 0;
  padding: 2px;
  border: 1px solid #d1edec;
  border-radius: 2px;
`;

const Outer = styled.div`
  border-radius: 2px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  background: ${colour.primary};
  border: 1px solid ${colour.primary};
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover {
    background: #FFF;
    color: ${colour.primary};
  }
`;

const HomeBtn = styled(Home)`

`;

export default ({ back }) => (
  <Wrapper>
    <Outer onClick={back} >
      <HomeBtn size={20}/>
    </Outer>
  </Wrapper>
);