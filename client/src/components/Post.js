import React, { Component } from 'react';
import styled from 'styled-components';

import { Title } from './Generics';
import { colours, sizes, sortModes } from '../utils';
import FlowControl from './FlowControl';
import PostInfo from './PostInfo';
import PostIconBar from './PostIconBar';
import Comment from './Comment';

const Wrapper = styled.div`
  border: 1px solid ${colours.grey_1};
  border-radius: ${sizes.border_radius};
  background: ${colours.grey_1};
  min-height: 70px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  padding: 0 10px 10px 10px;
  color: ${colours.black};
`;

const Text = styled.p`
  margin: 5px 0 5px 0;
`;

export default class Post extends Component {
  state = {
    sortingMode: sortModes.none
  };

  render() {
    const { sortingMode } = this.state;
    const { post: { title, _children, text, _author: { username }, createdAt }, setViewIndex } = this.props;

    return (
      <div>
        <FlowControl setViewIndex={setViewIndex} />
        <Wrapper>
          <PostInfo username={username} createdAt={createdAt} />
          <Title>{ title }</Title>
          <Text>{ text }</Text>
          <PostIconBar children={_children}/>
        </Wrapper>
        {
          _children ?
            _children.sort(sortingMode).map(n => (
              <Comment
                comment={n}
                root
                key={`comment-${n._id}`}
              />
            ))
            : <p>No comments yet.</p>
        }
      </div>
    );
  }
}
