import React, { Component } from 'react';
import styled from 'styled-components';
import { sizes, api } from '../utils';
import { SubmitButton, TextInput } from '../components';
import { Editor } from '@tinymce/tinymce-react';

const Wrapper = styled.div`
padding: ${sizes.top} 0 0 ${sizes.sides};
margin-bottom: 10px;

@media (max-width: 1160px) {
  padding: 10px 0 0 15px;
}
@media (max-width: 768px) {
 padding: 5px;
}
`;

const ButtonWrapper = styled.div`
  float: left;
  max-width: 300px;
  margin: 0 0 0 -10px;
  padding: 0;
`;

export default class PostEditor extends Component {

  state = {
    title: '',
    content: ''
  }

  handleChange = content => this.setState({ content });

  titleChange = ({ target: { value } }) => this.setState({ title: value });

  handleSubmit = () => {
    const { title, content } = this.state;
    const { user: { _id, token }, toggle } = this.props.user;
    console.log(this.props.user);
    console.log(_id, token);
    const payload = { title, text: content, userId: _id };
    api.createPost(payload, token)
      .then(data => {
        console.log(data);
        toggle();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { title, content } = this.state;

    return (
      <Wrapper>
        <h2>Create Post</h2>
        <TextInput
          name='title'
          placeholder='Enter title'
          value={title}
          onChange={this.titleChange}
        />
        <Editor
          apiKey='API_KEY'
          value={content}
          onEditorChange={this.handleChange}
          init={{ plugins: 'link table' }}
        />
        <ButtonWrapper>
          <SubmitButton
            text='Create Post'
            onClick={this.handleSubmit}
          />
        </ButtonWrapper>
      </Wrapper>
    );
  }
}
