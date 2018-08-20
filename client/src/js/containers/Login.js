import React, { Component } from 'react';
import { GridItem } from 'styled-grid-responsive';
import { Card } from '../components';

export default class PostContainer extends Component {
	state = {
		email: '',
		password: '',
		confirmPassword: '',
		message: ''
	};

	render() {
		return (
			<GridItem col={1}>
				<Card>Login</Card>
			</GridItem>
		);
	}
}
