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
	width: 100vw;
`;

const Inner = styled.div`
	margin: 150px 57px 0 40px;
	border-left: 2px solid ${colour.border};
	border-right: 2px solid ${colour.border};
	height: 100%;
	min-height: 100vh;
	padding: 0;

	color: ${colour.grey[0]};

	@media only screen and (min-width: 2000px) {
		padding: 0 260px 0 260px;
	}

	@media only screen and (min-width: 1700px) {
		padding: 0 180px 0 180px;
	}

	@media only screen and (max-width: 768px) {
		margin: 150px 20px 0 20px;
	}
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
