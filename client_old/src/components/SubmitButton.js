import React from 'react';
import styled from 'styled-components';
import { colours, sizes, animation } from '../utils';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 5px 10px 0 10px;
	margin: 0;
`;

const Button = styled.button`
	padding: 5px;
	width: 100%;
	border-radius: ${sizes.border_radius};
	border: 1px solid ${props => props.colour || colours.secondary[1]};
	outline: none;
	font-size: 14px;
	color: ${props => props.colour || colours.secondary[1]};
	animation: ${animation.slideDown} 1s ease-in;
	transition: all .3s ease-in-out;
	cursor: pointer;
	background: ${colours.greyscale[0]};

	&:hover,
	&:active {
		color: ${colours.greyscale[0]};
		background: ${colours.secondary[1]};
	}
`;

export default ({ text, onClick }) => (
	<Wrapper>
		<Button onClick={onClick}>{ text }</Button>
	</Wrapper>
);
