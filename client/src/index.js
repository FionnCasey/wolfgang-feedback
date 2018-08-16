import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers';
import { injectGlobal } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
	html, body {
		margin: 0;
		padding: 0;
		background: #efefef;
		box-sizing: border-box;
		font-family: sans-serif;
		list-style-type: none;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
