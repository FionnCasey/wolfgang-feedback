import React, { Component } from 'react';
import { GridItem } from 'styled-grid-responsive';
import { api } from '../utils';
import { Card } from '../components';

export default class PostContainer extends Component {
	state = {
		index: -1,
		posts: []
	};

	render() {
		return (
			<GridItem media={{ phone: 1 }} col={3/4}>
				<Card>Post Container</Card>
			</GridItem>
		);
	}
}
