import React, { Component } from 'react';
import { withUserContext } from '../context';
import styled from 'styled-components';
import { Grid } from 'styled-grid-responsive';
import PostContainer from './PostContainer';
import Sidebar from './Sidebar';
import Login from './Login';

const Outer = styled.div`
	background: papayawhip;
	overflow: hidden;
	height: 100vh;
	width: 100vw;
`;

const Inner = styled.div`
	padding: 20px;
`;

class Main extends Component {
	render() {
		const { user } = this.props;
		return (
			<Outer>
				<Inner>
					<Grid>
						{ !user.loggedIn() ? <PostContainer /> : <Login /> }
						{ !user.loggedIn() && <Sidebar /> }
					</Grid>
				</Inner>
			</Outer>
		);
	}
}

export default withUserContext(Main);
