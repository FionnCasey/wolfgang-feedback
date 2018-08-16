import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';

import { ContextProvider } from '../libs';
import { sizes } from '../utils';
import PostContainer from './PostContainer';
import NavContainer from './NavContainer';
import SidebarContainer from './SidebarContainer';

const Wrapper = styled.div`
  margin-top: ${sizes.nav_height};
`;

export default class App extends Component {
  render() {
    return (
      <ContextProvider>
        <Wrapper>
          <NavContainer />
          <Grid>
            <GridItem media={{ phone: 1 }} col={3/4}><PostContainer /></GridItem>
            <GridItem col={1/4}><SidebarContainer /></GridItem>
          </Grid>
        </Wrapper>
      </ContextProvider>
    );
  }
}
