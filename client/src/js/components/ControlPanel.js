import React from 'react';
import styled from 'styled-components';
import { colour } from '../utils';

const Wrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.div`
  background: ${colour.grey[1]};
  color: #FFF;
  letter-spacing: 2px;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  display: inline-block;
  width: 200px;
  text-align: center;
  border-radius: 27px;
  transition: all .3s ease-in-out;

  &:hover {
    background: ${colour.primary};
  }
`;

export default props => (
  <Wrapper>
    <Button>POST IDEA</Button>
    <Button>LOW-DOWN</Button>
    <Button>FILTER</Button>
  </Wrapper>
);
