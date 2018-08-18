import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { sortModes, sizes, colours, box_shadow, animation } from '../utils';
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

export default class Comment extends Component {
  state = {
    showChildren: true,
    sortingMode: sortModes.none,
    error: ''
  };

  submitVote = async (value) => {
    try {
      const payload = {

      };
      const res = await fetch('/v1/votes', {
        method: 'post',

      })
  	} catch (err) {
  		this.setState({ error: 'Error submitting vote.' });
  	}
  };

  render() {
    const { _id, text, _author: { username }, _votes, _children, createdAt } = this.props.comment;
    const { root = false } = this.props;
    const { showChildren, sortingMode } = this.state;
    const indent = root ? '0' : sizes.comment_indent;

    return (
      <AppContext.Consumer>
        {context => (
          <Wrapper indent={indent} root={root}>
            <CommentInfo
              username={username}
              votes={_votes}
              createdAt={createdAt}
            />
            <Text>{ text }</Text>
            <CommentIconBar children={_children} />
            {
              showChildren &&
                _children.sort(sortingMode).map(n => (
                  <Comment
                    comment={n}
                    key={`comment-${n._id}`}
                  />
                ))
            }
          </Wrapper>
        )}
      </AppContext.Consumer>
    );
  }
}
