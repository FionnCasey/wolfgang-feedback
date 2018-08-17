import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { colours, sizes } from '../utils';

const Wrapper = styled.div`
  min-height: 400px;
	margin: ${sizes.top} ${sizes.sides} 0 0;
	background: ${colours.grey_1};
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  color: ${colours.black};
	border: 1px solid ${colours.grey_1};
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
  background: ${colours.wg_green};
  border: 1px solid ${colours.wg_green};
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
