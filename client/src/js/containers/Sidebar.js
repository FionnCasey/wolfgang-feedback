import React, { Component } from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';

const Wrapper = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`;

export default class Sidebar extends Component {
	state = {
		messages: []
	};

	render() {
		return (
			<GridItem col={1/4}>
				<Wrapper><h1>Sidebar</h1></Wrapper>
			</GridItem>
		);
	}
}
