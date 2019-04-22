import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {postLogin, putRegistration} from "../../actions/loginTracks";
import LoginForm from "../../forms/LoginForm.jsx";
import RegistrationForm from '../../forms/RegistrationForm.jsx';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.styleRoot={display: 'flex'}
  }

  render() {
    return (
      <div style={this.styleRoot}>
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
    login: state.login,
    err: state.error
  }),
  dispatch => ({
    login: (data) => dispatch(postLogin(data)),
    registration: (data) => dispatch(putRegistration(data)),

  })
)(Login);
