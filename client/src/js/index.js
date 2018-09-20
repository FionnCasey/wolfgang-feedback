import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiActions } from './actions';
import {
	Login,
	PostList
} from './components';

injectGlobal`
	
	body {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		overflow-x: hidden;
	}

	*, *:before, *:after {
		box-sizing: border-box;
	}
`;

const mapStateToProps = state => {
	return { loggedIn: state.user && true };
};

const mapDispatchToProps = dispatch => {
  return {
    tryGetUserFromStorage: () => dispatch(apiActions.tryGetUserFromStorage())
  };
};

class App extends Component {
	componentDidMount() {
		if (!this.props.loggedIn) this.props.tryGetUserFromStorage();
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/posts' component={PostList} />
					<Route path='/posts/:postId' component={Login} />
				</Switch>
			</Router>
		);
	}
}

App.propTypes = {
	tryGetUserFromStorage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
