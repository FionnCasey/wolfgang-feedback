import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
`;

export default class TextEditor extends Component {
  state = {
    open: false
  };

  toggleEditor = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <Wrapper>
        <Button
          text='COMMENT OR SUGGEST'
          fontSize='22px'
          padding='5px 30px 5px 30px'
          borderRadius='25px'
          secondary
        />
      </Wrapper>
    ); 
  }
}