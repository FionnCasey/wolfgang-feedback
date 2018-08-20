import React, { Component } from 'react';
import styled from 'styled-components';

import { AppContext } from '../libs';
import { colours, sizes, box_shadow } from '../utils';

const Wrapper = styled.div`
  top: 0;
	background: ${colours.primary[1]};
	position: fixed;
	width: 100%;
  min-height: ${sizes.nav_height};
  box-shadow: ${box_shadow};
  color: #ffffff;
  z-index: 5;
`;

const Version = styled.span`
  padding: 3px 5px 0 0;
  font-size: 11px;
  font-weight: lighter;
  colour: '#d8d8d8';
  float: right;
`;

export default class NavContainer extends Component {

	render() {
		return(
			<Wrapper>
        <Version>version: 0.1.0</Version>
			</Wrapper>
		)
	}
}
