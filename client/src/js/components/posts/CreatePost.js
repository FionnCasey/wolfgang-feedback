import React, { Component } from 'react';
import PostEditor from './PostEditor';
import PostNav from './PostNav';
import styled from 'styled-components';
import { colour, animation, api } from '../../utils';
import { withContext } from '../../context';

const Wrapper = styled.div`
  padding: 10px 25px 25px 25px;
`;

const TitleWrapper = styled.div`
  margin: 10px 3px;
  height: 50px;
  display: flex;
  align-items: flex-end;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid ${colour.primary};
  outline: none;
  transiiton: all .3s ease-in-out;
  opacity: ${props => (props.editing ? '100' : '0')};
  flex-grow: 1;
  color: ${colour.grey[0]};
  font-size: 16px;
  font-weight: 200;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${props => (props.editing ? '14px' : '20px')};
  cursor: pointer;
  animation: ${props => (props.editing ? animation.raiseHigher : animation.lower)} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  color: ${props => (props.editing ? colour.primary : colour.grey[0])};
  transition: all .3s ease-in-out;
  position: absolute;
`;

class CreatePost extends Component {
  state = {
    title: '',
    editing: false
  };

  handleChange = e => this.setState({ title: e.target.value });

  toggleEdit = () => {
    if (this.state.title.length === 0) {
      this.setState(prev => ({ editing: !prev.editing }));
    }
  };

  submitPost = async text => {
    console.log(text);
    if (this.state.title.length < 6 || text.length < 6) {
      // TODO: error..
      return;
    }

    const { id, token } = this.props.context.user;
		if (!id || !token) {
			console.log('Must be logged in.');
			// TODO: Handle this.
			//return;
    }
    
    const res = await api.createPost({
      userId: id,
      title: this.state.title,
      text
    }, token);

    if (res.success) {
      // TODO: notify...
      this.props.setView('POSTS');
    } else {
      console.log(res.message);
    }
  };

  render() {
    const { setView } = this.props;

    return (
      <Wrapper>
        <PostNav back={() => setView('POSTS')} />
        <TitleWrapper>
          <Input
            type='text'
            value={this.state.value} 
            onChange={this.handleChange}
            editing={this.state.editing}
          />
          <Title
            editing={this.state.editing}
            onClick={this.toggleEdit}
          >
            Enter Title
          </Title>
        </TitleWrapper>
        <PostEditor 
          submitPost={this.submitPost}
        />
      </Wrapper>
    );
  }
}

export default withContext(CreatePost);