import React, {PureComponent, Component} from "react";
import {connect} from "react-redux";

import {postLogin, putRegistration} from "../../reducers/Actions/loginTracks";
import LoginForm from "../../forms/LoginForm.jsx";
import RegistrationForm from '../../forms/RegistrationForm.jsx';


class Login extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <LoginForm onSubmit={this.props.login}/>
      <RegistrationForm onSubmit={this.props.registration}/>
      </div>

    )
  }
}


export default connect(
  state => ({
    api: state.api,
    err: state.error
  }),
  dispatch => ({
    login: (data) => dispatch(postLogin(data)),
    registration: (data) => dispatch(putRegistration(data)),
  })
)(Login);
