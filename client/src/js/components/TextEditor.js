import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import { colour, animation } from '../utils';
import { stateToHTML } from 'draft-js-export-html';

const staticToolbarPlugin = createToolbarPlugin();

const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  animation: ${animation.fadeIn} .3s ease-in-out;
`;

const TextWrapper = styled.div`
  border: 1px solid ${colour.primary}
  cursor: text;
  border-radius: 1px 1px 0 0;
  background: #FFF;
  height: 140px;
  padding: 12px;
`;

const EditorWrapper = styled.div`
  width: 100%;
`;

const ToolbarWrapper = styled.div`
  display: flex;
  background: ${colour.primary};
  border-left: 1px solid ${colour.primary}
  border-right: 1px solid ${colour.primary}
  border-bottom: 1px solid ${colour.primary}
  overflow: hidden;

  div {
    background: ${colour.primary};
    z-index: 2;
    border-radius: 0 0 1px 1px;
    border: 0 !important;
  }

  button {
    background: ${colour.primary};
    color: #FFF;
    font-size: 18px;
    border: 0;
    padding-top: 5px;
    vertical-align: bottom;
    height: 34px;
    width: 36px;
  }
  
  button svg {
    fill: #FFF;
  }
  
  button:hover, button:focus {
    background: #a0e8e4;
    outline: 0;
  }
`;

const Btn = styled.span`
  cursor: pointer;
  position: relative;
  top: 3px;
  font-size: 14px;
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
  color: #FFF;
  height: 100%
  padding: 5px 10px;
  border-radius: 2px;
  
  &:hover {
    background: #a0e8e4;
  }
`;

export default class TextEditor extends Component {
  state = {
    open: false,
    editorState: createEditorStateWithText('')
  };

  toggleEditor = () => {
    this.setState(prevState => ({ open: !prevState.open }));
    if (this.state.open) this.editor.focus();
  };

  onChange = editorState => this.setState({ editorState });

  focus = () => this.editor.focus();

  createComment = () => {
    const { editorState } = this.state;
    const text = stateToHTML(editorState.getCurrentContent());
    const strippedText = text.replace('<p>', '').replace('</p>', '');
    this.props.submitComment(this.props.id, strippedText);
    this.toggleEditor();
  };

  render() {
    const { open, editorState } = this.state;

    return (
      <Wrapper>
        {
          open ?
            <EditorWrapper>
              <TextWrapper onClick={this.focus}>
                <Editor
                  editorState={editorState}
                  onChange={this.onChange}
                  plugins={plugins}
                  ref={element => { this.editor = element; }}
                />
              </TextWrapper>
              <ToolbarWrapper>
                <Toolbar />
                <Btn onClick={this.createComment}>Submit Comment</Btn>
              </ToolbarWrapper>
            </EditorWrapper>
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