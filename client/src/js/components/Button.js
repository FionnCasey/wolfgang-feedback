import React from 'react';
import styled from 'styled-components';
import { colour } from '../utils';

const Button = styled.div`
  background: ${props => (props.secondary ? colour.secondary : colour.primary)};
  color: ${colour.grey[0]};
  font-weight: ${props => props.bold && 'bold'};
  font-size: ${props => props.fontSize};
  border-radius: ${props => props.borderRadius || '15px'};
  padding: ${props => props.padding || '5px 10px 5px 10px'};
  letter-spacing: 2px;
  border: 1px solid transparent;
  transition: all .4s ease-in-out;
  cursor: pointer;
  width: ${props => props.width};
  height: ${props => props.height};

  &:hover {
    border: 1px solid ${props => (props.secondary ? colour.secondary : colour.primary)};
    background: #FFF;
  }
`;

export default ({ text, height, width, bold, fontSize, borderRadius, padding, secondary, onClick }) => (
  <Button
    width={width}
    height={height}
    secondary={secondary}
    bold={bold}
    borderRadius={borderRadius}
    padding={padding}
    fontSize={fontSize}
    onClick={onClick}
  >
   { text }
  </Button>
);