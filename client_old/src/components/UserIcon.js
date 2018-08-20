import React from 'react';
import styled from 'styled-components';
import logo from '../icons/wg_logo.svg';

const Wrapper = styled.img`
  border-radius: 50%;
  height: 20px;
  position: relative;
  top: 4px;
  margin-right: 5px;
`;

export default ({ src }) => <Wrapper src={ src || logo } />;
