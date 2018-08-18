import React, { Component } from 'react';
import styled from 'styled-components';

import { Title } from './Generics';
import { colours, sizes, sortModes, box_shadow } from '../utils';
import FlowControl from './FlowControl';
import PostInfo from './PostInfo';
import PostIconBar from './PostIconBar';
import Comment from './Comment';

const Wrapper = styled.div`
  border: 1px solid ${colours.greyscale[1]};
  border-radius: ${sizes.border_radius};
  background: ${colours.greyscale[0]};
  min-height: 70px;
  box-shadow: ${box_shadow};
  padding: 0 10px 10px 10px;
  color: ${colours.greyscale[6]};
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
    const {
      post: { _id, title, _children, text,
      _author: { username }, createdAt },
      setViewIndex,
      updatePost,
      loading
    } = this.props;

    return (
          <div>
            <FlowControl
              setViewIndex={setViewIndex}
              updatePost={updatePost}
              postId={_id}
              loading={loading}
            />
            <Wrapper>
              <PostInfo username={username} createdAt={createdAt} />
              <Title>{ title }</Title>
              <Text>{ text }</Text>
              <PostIconBar children={_children} isMainView/>
            </Wrapper>
            {
              _children &&
                _children.sort(sortingMode).map(n => (
                  <Comment
                    comment={n}
                    root
                    key={`comment-${n._id}`}
                  />
                ))
            }
          </div>
    );
  }
}
