import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { sortModes, sizes, colours, box_shadow, animation, api } from '../utils';
import CommentInfo from './CommentInfo';
import CommentIconBar from './CommentIconBar';

const Wrapper = styled.div`
  margin: 5px 0 0 0;
  padding: 0 10px 10px 10px;
  margin-left: ${props => props.indent};
  border-left: 2px solid ${colours.greyscale[6]};
  border-radius: 0 ${sizes.border_radius} 0 ${sizes.border_radius};
  background: ${colours.greyscale[0]};
  animation: ${animation.fadeIn} 0.3s ease-in-out;
  box-shadow: ${box_shadow};
`;

const Text = styled.p`
  margin: 5px 0 5px 0;
  color: ${colours.greyscale[5]}
  font-weight: thin;
`;

class Comment extends Component {
  state = {
    showChildren: true,
    sortingMode: sortModes.none
  };

  submitVote = value => {
    const { _id, token } = this.props.user;
    const parentId = this.props.comment._id;
    api.submitVote({ userId: _id, parentId, parentIsPost: false, value }, token)
      .then(data => {
        this.props.updatePost(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { _id, text, _author: { username }, _votes, _children, createdAt } = this.props.comment;
    const { root = false } = this.props;
    const userId = this.props.user._id;
    const { showChildren, sortingMode } = this.state;
    const indent = root ? '0' : sizes.comment_indent;
    const userVote = _votes.find(n => n._user === userId);
    const voteValue = userVote ? userVote.value : 0;

    return (
      <Wrapper indent={indent} root={root}>
        <CommentInfo
          username={username}
          votes={_votes}
          createdAt={createdAt}
        />
        <Text>{ text }</Text>
        <CommentIconBar
          children={_children}
          submitVote={this.submitVote}
          voteValue={voteValue}
        />
        {
          showChildren &&
            _children.sort(sortingMode).map(n => (
              <AppContext.Consumer key={`comment-${n._id}`}>
                {({ state: { user }, updatePost }) => (
                  <Comment
                    comment={n}
                    user={user}
                    updatePost={updatePost}
                  />
                )}
              </AppContext.Consumer>
            ))
        }
      </Wrapper>
    );
  }
}

export default ({ root, comment }) => (
  <AppContext.Consumer>
    {({ state: { user }, updatePost }) => (
      <Comment
        root={root}
        comment={comment}
        user={user}
        updatePost={updatePost}
      />
    )}
  </AppContext.Consumer>
)
