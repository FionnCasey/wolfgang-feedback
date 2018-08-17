import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { colours, sizes } from '../utils';

const Wrapper = styled.div`
  top: 0;
	background: ${colours.wg_green};
	position: fixed;
	width: 100%;
  min-height: ${sizes.nav_height};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  color: #ffffff;
  z-index: 5;
`;

export default class NavContainer extends Component {

	render() {
		return(
			<Wrapper>

			</Wrapper>
		)
	}
}
