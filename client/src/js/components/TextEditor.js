import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Editor, EditorState } from 'draft-js';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
`;

export default class TextEditor extends Component {
  state = {
    open: false,
    editorState: EditorState.createEmpty()
  };

  toggleEditor = () => {
    this.setState({ open: true });
  }

  render() {
    const { open, editorState } = this.state;

    return (
      <Wrapper>
        {
          open ?
            <Editor editorState={editorState} onChange={this.onChange} />
            :
            <Button
              text='COMMENT OR SUGGEST'
              fontSize='22px'
              padding='5px 30px 5px 30px'
              borderRadius='25px'
              secondary
              onClick={() => this.toggleEditor()}
            />
        }
      </Wrapper>
    ); 
  }
}