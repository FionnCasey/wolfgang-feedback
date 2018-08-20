import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { UserProvider } from './context';
import Main from './containers/Main';

injectGlobal`
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

export default class WolfApp extends Component {
  render() {
    return (
      <UserProvider>
        <Main />
      </UserProvider>
    );
  }
}
