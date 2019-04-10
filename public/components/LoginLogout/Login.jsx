import React, {PureComponent, Component} from "react";
import {connect} from "react-redux";

import {postLogin, putRegistration} from "../../reducers/Actions/loginTracks";
import LoginForm from "../../forms/LoginForm.jsx";
import RegistrationForm from '../../forms/RegistrationForm.jsx';
import {getUserInfo} from "../../reducers/Actions/headerTracks";


class Login extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='log-reg-form'>
          <LoginForm onSubmit={this.props.login}/>
        </div>
        <div className='log-reg-form'>
          <RegistrationForm onSubmit={this.props.registration}/>
        </div>
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
    getUser: () => dispatch(getUserInfo()),

  })
)(Login);
