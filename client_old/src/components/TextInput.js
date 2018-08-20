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

const Input = styled.input`
	type: ${props => props.type || 'text'};
	padding: 5px;
	width: 100%;
	border-radius: ${sizes.border_radius};
	border: 1px solid ${props => props.border || colours.greyscale[2]};
	outline: none;
	font-size: 14px;
	font-weight: lighter;
	color: ${props => props.colour || colours.greyscale[3]};
	animation: ${animation.fadeIn} 0.2s ease-out;

	&:active,
	&:focus {
		border-color: ${colours.secondary[1]};
		color: ${colours.greyscale[5]};
	}
`;

export default ({ name, placeholder = 'Enter text', value, type, border, onChange }) => (
	<Wrapper>
		<Input
			name={name}
			placeholder={placeholder}
			value={value}
			type={type}
			border={border}
			onChange={onChange}
		/>
	</Wrapper>
);
