import React, { Component } from 'react';
import { withContext } from '../context';
import styled from 'styled-components';
import { Grid } from 'styled-grid-responsive';
import PostContainer from './PostContainer';
import Login from './Login';
import Header from './Header';
import { colour } from '../utils';

const Outer = styled.div`
	overflow-x: hidden;
	height: 100vh;
	width: 100vw;
`;

const Inner = styled.div`
	margin: 150px 40px 0 40px;
	padding: 40px;
	height: 100%;
	border-left: 2px solid ${colour.border};
	border-right: 2px solid ${colour.border};
`;

class Main extends Component {
	render() {
		const { user } = this.props.context;
		return (
			<Outer>
				<Header />
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
