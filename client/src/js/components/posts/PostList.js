import React, { Component } from 'react';
import styled from 'styled-components';
import { arrayUtils } from '../../utils';
import PostListItem from './PostListItem';
import { Grid } from 'styled-grid-responsive';

const Wrapper = styled.div`
  padding: 20px 20px 0 20px;
`;

export default class PostList extends Component {
  state = {
    sortMode: arrayUtils.sortModes.byMostRecent
  };

  render() {
    const { sortMode } = this.state;
    const { posts, setViewIndex } = this.props;
    const List = posts.sort(sortMode).map((n, i) => (
      <PostListItem
        key={n._id}
        post={n}
        index={i}
        open={() => setViewIndex(i)}
      />
    ));

    return (
      <Wrapper>
        <Grid>{ List }</Grid>
      </Wrapper>
    );
  }
}