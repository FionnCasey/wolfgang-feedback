import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { colours, sizes, box_shadow } from '../utils';

const Wrapper = styled.div`
  min-height: 400px;
	margin: ${sizes.top} ${sizes.sides} 0 0;
	background: ${colours.greyscale[0]};
	box-shadow: ${box_shadow};
  color: ${colours.black};
	border: 1px solid ${colours.greyscale[1]};
  border-radius: ${sizes.border_radius};
  padding: 0;

	@media (max-width: 1160px) {
		margin: 10px 15px 0 0;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const Top = styled.div`
  border-radius: ${sizes.border_radius} ${sizes.border_radius} 0 0;
  height: 38px;
  background: ${colours.primary[1]};
  border: 1px solid ${colours.primary[1]};
  margin: -1px;
`;

export default class SidebarContainer extends Component {

	render() {
		return(
			<Wrapper>
        <Top />
			</Wrapper>
		)
	}
}
