import React from 'react';
import styled from 'styled-components';
import { capitaliseWord, formatDate, colour } from '../utils';
import logo from '../../assets/wg_logo.svg';

const Wrapper = styled.div`
  border: 2px solid ${props => (props.secondary ? colour.secondary : colour.primary)};
  border-radius: 15px;
  margin: 10px 10px 0 10px;
  height: 60px;
  display: flex;
  align-items: center;

  h2 {
    font-weight: bold;
    margin: 0 0 0 25px;
    font-size: 18px;
    position: relative;
    top: -10px;
  }

  p {
    margin: 0;
    font-size: 14px;
    position: relative;
    top: 11px;
    left: -45px;
    color: ${colour.grey[1]};
  }
`;

const Image = styled.img`
  border-radius: 50%;
  height: 40px;
  position: relative;
  left: 10px;
  top: -1px;
`;

export default ({ user, createdAt, secondary }) => {

  return (
    <Wrapper secondary={secondary}>
      <Image src={logo} />
      <h2>{ capitaliseWord(user.username) }</h2>
      <p>{ formatDate(createdAt) }</p>
    </Wrapper>
  );
}