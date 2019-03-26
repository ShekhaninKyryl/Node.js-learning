import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.Logging = this.Logging.bind(this);
    this.Registration = this.Registration.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  Logging() {
    let {Login} = this.props;
    let {email, password} = this.state;

    fetch('/guest/login',
      {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      })
      .then(res => res.json())
      .then(res => Login(res))
  }

  Registration() {
    let {Login} = this.props;
    let {email, password} = this.state;

    fetch('/guest/registration',
      {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      })
      .then(res => res.json())
      .then(res => Login(res));
  }

  render() {
    let className = "login-form";
    return (
      <form id={className}>
        <label>Email
          <Input className={className} value={this.state.email} type={'text'} id={'email'}
                 handleChange={this.handleChange}/>
        </label>
        <label>Password
          <Input className={className} value={this.state.password} type={'password'} id={'password'}
                 handleChange={this.handleChange}/>
        </label>
        <input type="button" value="Login" id="login" onClick={this.Logging}/>
        <input type="button" value="Registration" id="registration" onClick={this.Registration}/>
      </form>
    )
  }
}


export default Login;
