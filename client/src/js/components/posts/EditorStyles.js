import styled from 'styled-components';
import { colour } from '../../utils';

const Button = styled.span`
  cursor: pointer;
  position: relative;
  top: 3px;
  font-size: 14px;
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
  color: ${colour.grey[0]};
  height: 100%
  padding: 5px 10px;
  border-radius: 2px;
  
  &:hover {
    background: #eadef7;
  }
`;

const ToolbarWrapper = styled.div`
  display: flex;
  background: ${colour.secondary};
  border-left: 1px solid ${colour.secondary}
  border-right: 1px solid ${colour.secondary}
  border-bottom: 1px solid ${colour.secondary}
  overflow: hidden;

  div {
    background: ${colour.secondary};
    z-index: 2;
    border-radius: 0 0 1px 1px;
    border: 0 !important;
  }

  button {
    background: ${colour.secondary};
    color: ${colour.grey[0]};
    font-size: 18px;
    border: 0;
    padding-top: 5px;
    vertical-align: bottom;
    height: 34px;
    width: 36px;
    cursor: pointer;
  }
  
  button svg {
    fill: ${colour.grey[0]};
  }
  
  button:hover, button:focus {
    background: #eadef7;
    outline: 0;
  }
`;

const TextWrapper = styled.div`
  border-left: 1px solid ${colour.secondary};
  border-right: 1px solid ${colour.secondary};
  border-top: 1px solid ${colour.secondary};
  cursor: text;
  border-radius: 1px 1px 0 0;
  background: #FFF;
  min-height: 240px;
  padding: 12px;
`;

export {
  Button,
  ToolbarWrapper,
  TextWrapper
};