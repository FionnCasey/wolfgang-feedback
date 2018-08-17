import React, { Component } from 'react';
import styled from 'styled-components';

import { sortModes, sizes, colours } from '../utils';
import CommentInfo from './CommentInfo';
import CommentIconBar from './CommentIconBar';

const Wrapper = styled.div`
  margin: 5px 0 0 0;
  padding: 0 10px 10px 10px;
  margin-left: ${props => props.indent};
  border-left: 2px solid ${colours.grey_2};
  border-radius: ${sizes.border_radius};
  background: ${colours.grey_1};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
`;

const Text = styled.p`
  margin: 5px 0 5px 0;
`;

export default class Comment extends Component {
  state = {
    showChildren: true,
    sortingMode: sortModes.none
  };

  render() {
    const { text, _author: { username }, _votes, _children, createdAt } = this.props.comment;
    const { root = false } = this.props;
    const { showChildren, sortingMode } = this.state;
    const indent = root ? '0' : sizes.comment_indent;

    return (
      <Wrapper indent={indent} root={root}>
        <CommentInfo
          username={username}
          votes={_votes}
          createdAt={createdAt}
        />
        <Text>{ text }</Text>
        <CommentIconBar children={_children} />
        {
          showChildren ?
            _children.sort(sortingMode).map(n => (
              <Comment
                comment={n}
                key={`comment-${n._id}`}
              />
            )) : ''
        }
      </Wrapper>
    );
  }
}
