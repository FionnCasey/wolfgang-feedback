import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { ContextProvider } from './context';
import Main from './containers/Main';

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400');
	
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

export default class WolfApp extends Component {
  render() {
    return (
      <ContextProvider>
        <Main />
      </ContextProvider>
    );
  }
}
