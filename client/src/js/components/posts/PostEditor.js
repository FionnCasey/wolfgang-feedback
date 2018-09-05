import React, { Component } from 'react';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { stateToHTML } from 'draft-js-export-html';
import { RichUtils } from 'draft-js';
import { Button, ToolbarWrapper, TextWrapper } from './EditorStyles';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

const MAX_LENGTH = 2000;

export default class PostEditor extends Component {
  state = {
    editorState: createEditorStateWithText('')
  };

  onChange = editorState => this.setState({ editorState });

  handleTitleChange = e => this.setState({ title: e.target.value });

  focus = () => this.editor.focus();

  _handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  _getLengthOfSelectedText = () => {
    const { editorState } = this.state;
    const currentSelection = editorState.getSelection();
    const isCollapsed = currentSelection.isCollapsed();

    let length = 0;

    if (!isCollapsed) {
      const currentContent = this.state.editorState.getCurrentContent();
      const startKey = currentSelection.getStartKey();
      const endKey = currentSelection.getEndKey();
      const startBlock = currentContent.getBlockForKey(startKey);
      const isStartAndEndBlockAreTheSame = startKey === endKey;
      const startBlockTextLength = startBlock.getLength();
      const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
      const endSelectedTextLength = currentSelection.getEndOffset();
      const keyAfterEnd = currentContent.getKeyAfter(endKey);

      if (isStartAndEndBlockAreTheSame) {
        length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
      } else {
        let currentKey = startKey;

        while (currentKey && currentKey !== keyAfterEnd) {
          if (currentKey === startKey) {
            length += startSelectedTextLength + 1;
          } else if (currentKey === endKey) {
            length += endSelectedTextLength;
          } else {
            length += currentContent.getBlockForKey(currentKey).getLength() + 1;
          }
          currentKey = currentContent.getKeyAfter(currentKey);
        }
      }
    }
    return length;
  };

  createPost = () => {
    const { editorState } = this.state;
    const text = stateToHTML(editorState.getCurrentContent());
    const strippedText = text.replace('<p>', '').replace('</p>', '');
    this.props.submitPost(strippedText);
  }

  _handleBeforeInput = () => {
    const currentContent = this.state.editorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;
    const selectedTextLength = this._getLengthOfSelectedText();

    if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
      return 'handled';
    }
  };

  render() {
    return (
      <React.Fragment>
        <TextWrapper onClick={this.focus}>
          <Editor
            _handleBeforeInput={this._handleBeforeInput}
            handleKeyCommand={this._handleKeyCommand}
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => { this.editor = element; }}
          />
        </TextWrapper>
        <ToolbarWrapper>
          <Toolbar />
          <Button onClick={this.createPost}>
            Submit Post
          </Button>
        </ToolbarWrapper>
      </React.Fragment>
    );
  }
}