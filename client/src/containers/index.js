import React, { Component } from 'react';
import { Grid, GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';

import { ContextProvider, AppContext } from '../libs';
import { sizes } from '../utils';
import PostContainer from './PostContainer';
import NavContainer from './NavContainer';
import SidebarContainer from './SidebarContainer';
import LoginContainer from './LoginContainer';
import PostEditor from './PostEditor';

const Wrapper = styled.div`
  margin-top: ${sizes.nav_height};
`;

const Posts = props => (
  <React.Fragment>
    <GridItem media={{ phone: 1 }} col={3/4}><PostContainer /></GridItem>
    <GridItem col={1/4}><SidebarContainer toggle={props.toggle} /></GridItem>
  </React.Fragment>
);

const CreatePost = user => (
  <React.Fragment>
    <GridItem media={{ phone: 1 }} col={3/4}><PostEditor user={user}/></GridItem>
    <GridItem col={1/4}><SidebarContainer toggle={user.toggle}/></GridItem>
  </React.Fragment>
);

export default class App extends Component {
  // TODO: react router
  state ={
    open: false
  };

  togglePostPanel = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { open } = this.state;
    return (
        <ContextProvider>
          <AppContext.Consumer>
            {({ state: { user } }) => (
              <Wrapper>
                <NavContainer />
                <Grid>
                  {
                    user.loggedIn
                      ? open
                        ? <CreatePost user={user} toggle={this.togglePostPanel}/>
                        : <Posts toggle={this.togglePostPanel}/>
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
