import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';

import { ContextProvider, AppContext } from '../libs';
import { sizes } from '../utils';
import PostContainer from './PostContainer';
import NavContainer from './NavContainer';
import SidebarContainer from './SidebarContainer';
import LoginContainer from './LoginContainer';

const Wrapper = styled.div`
  margin-top: ${sizes.nav_height};
`;

const Posts = () => (
  <React.Fragment>
    <GridItem media={{ phone: 1 }} col={3/4}><PostContainer /></GridItem>
    <GridItem col={1/4}><SidebarContainer /></GridItem>
  </React.Fragment>
);

export default class App extends Component {
  render() {
    return (
        <ContextProvider>
          <AppContext.Consumer>
            {({ state: { user } }) => (
              <Wrapper>
                <NavContainer />
                <Grid>
                  {
                    user.loggedIn
                      ? <Posts />
                      : <LoginContainer />
                  }
                </Grid>
              </Wrapper>
            )}
          </AppContext.Consumer>
        </ContextProvider>
    );
  }
}
