import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  background-image: url(${props => props.src});
  width: 450px;
  height: 450px;
  background-size: cover;
  resize: both;
  position: absolute;
  top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ src, width, height, children }) => (
  <Content src={src} width={width} height={height}>
    { children }
  </Content>
);