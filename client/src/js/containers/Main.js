import React, { Component } from 'react';
import { withContext } from '../context';
import styled from 'styled-components';
import { Grid } from 'styled-grid-responsive';
import PostContainer from './PostContainer';
import Login from './Login';

const Outer = styled.div`
	overflow: hidden;
	height: 100vh;
	width: 100vw;
`;

const Inner = styled.div`
	padding: 20px;
`;

class Main extends Component {
	render() {
		const { user } = this.props.context;
		return (
			<Outer>
				<Inner>
					<Grid>
						{ !user.loggedIn() ? <PostContainer /> : <Login /> }
					</Grid>
				</Inner>
			</Outer>
		);
	}
}

export default withContext(Main);
