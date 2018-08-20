import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import WolfApp from './js';

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <WolfApp />
      </div>
    );
  }
}

export default App;
