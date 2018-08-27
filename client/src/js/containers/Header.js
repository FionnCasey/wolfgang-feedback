import React, { Component } from 'react';
import styled from 'styled-components';
import { withContext } from '../context';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  height: 150px;
  z-index: 10;
  margin: 0;
  padding: 0;
  background: linear-gradient(#5C9FB8, #57C7B9);
`;

const Inner = styled.div`
  margin: 20px 40px 0 40px;
  border-top: 2px solid #FFF;
  border-left: 2px solid #FFF;
  border-right: 2px solid #FFF;
  height: 130px;
  display: flex;
  color: #FFF;
  padding: 16px 0 0 0;
  justify-content: center;

  h1 {
    font-size: 40px;
    letter-spacing: 15px;
    font-weight: 100;
  }
`;

class Header extends Component {

  render() {
    return (
      <Wrapper>
        <Inner>
          <h1>AWAREWOLF</h1>
        </Inner>
      </Wrapper>
    );
  }
}

export default withContext(Header);