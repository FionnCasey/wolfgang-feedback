import React, { Component } from 'react';
import styled from 'styled-components';
import { arrayUtils } from '../../utils';
import PostListItem from './PostListItem';
import { Grid } from 'styled-grid-responsive';

const Wrapper = styled.div`
  
`;

export default class PostList extends Component {
  state = {
    sortMode: arrayUtils.sortModes.byMostRecent
  };

  render() {
    const { sortMode } = this.state;
    const List = this.props.posts.sort(sortMode).map(n => (
      <PostListItem
        key={n._id}
        post={n}
      />
    ));

    return (
      <Wrapper>
        <Grid>{ List }</Grid>
      </Wrapper>
    );
  }
}