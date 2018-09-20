import React, { Component } from 'react';
import styled from 'styled-components';
import { withContext } from '../context';
import { colour } from '../utils';

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  height: 150px;
  z-index: 10;
  margin: 0;
  padding: 0;
  background: linear-gradient(#5CC4B6, #5DA3BD);
`;

const Inner = styled.div`
  margin: 20px 40px 0 40px;
  border-top: 2px solid #FFF;
  border-left: 2px solid #FFF;
  border-right: 2px solid #FFF;
  height: 130px;
  display: flex;
  color: #FFF;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    letter-spacing: 15px;
    font-weight: 100;

    @media only screen and (max-width: 768px) {
      font-size: 26px;
      letter-spacing: 5px;
    }
  }

  @media only screen and (max-width: 768px) {
    margin: 20px 20px 0 20px;
	}
`;

const Slope = styled.div`
  -webkit-clip-path: polygon(100% 85%, 0% 100%, 100% 100%);
  clip-path: polygon(100% 85%, 0% 100%, 100% 100%);
  background: ${colour.secondary};
  width: 100%;
  height: 100%;
  position: relative;
  top: -150px;
  z-index: -1;
`;

const Version = styled.div`
  color: #FFF;
  font-size: 10px;
  position: absolute;
  left: 2px;
`;

class Header extends Component {

  render() {
    return (
      <Wrapper>
        <Version>version: 1.0.0</Version>
        <Inner>
          <h1>AWAREWOLF</h1>
        </Inner>
        <Slope />
      </Wrapper>
    );
  }
}

export default withContext(Header);