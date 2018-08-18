import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { injectGlobal } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import { colours } from './utils';

injectGlobal`
	@import url('https://fonts.googleapis.com/css?family=Roboto');

	html, body {
		margin: 0;
		padding: 0;
		background: ${colours.greyscale[1]}
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
		list-style-type: none;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
