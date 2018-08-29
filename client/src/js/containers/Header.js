import React, { Component } from 'react';
import styled from 'styled-components';
import { withContext } from '../context';
import logo from '../../images/awarewolf_logo.svg';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  height: 150px;
  z-index: 10;
  margin: 0;
  padding: 0;
  background: linear-gradient(#f5cbb9, #51a6bb);
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

const Logo = styled.img`
  margin: 0;
  padding: 0;
  width: 80px;
`;

class Header extends Component {

  render() {
    return (
      <Wrapper>
        <Inner>
          <h1>AWAREWOLF</h1>
          <Logo src={logo}/>
        </Inner>
      </Wrapper>
    );
  }
}

export default withContext(Header);