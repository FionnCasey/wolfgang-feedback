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
  max-width: ${props => props.maxWidth || 'none'};
`;

const TextWrap = styled.div`
  margin-left: 20px;

  h2 {
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 14px;
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

export default ({ user, createdAt, secondary, maxWidth }) => {

  return (
    <Wrapper secondary={secondary} maxWidth={maxWidth}>
      <Image src={logo} />
      <TextWrap><h2>{ capitaliseWord(user.username) }</h2>
      <p>{ formatDate(createdAt) }</p></TextWrap>
    </Wrapper>
  );
}