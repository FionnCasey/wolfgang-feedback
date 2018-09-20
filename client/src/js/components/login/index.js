import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiActions } from '../../actions';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return { user: state.apiState.user };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(apiActions.login({email:'fionn@wolfgangdigital.com', password: 'W0lfgang911*'})),
    signup: (email, password) => dispatch(apiActions.signup({ email, password }))
  };
};

class LoginContainer extends Component {
  render() {
    return (
      <div onClick={this.props.login}>
        { this.props.user ? `Welcome ${this.props.user.username}.` : 'You are not logged in.' }
      </div>
    );
  }
};

LoginContainer.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);