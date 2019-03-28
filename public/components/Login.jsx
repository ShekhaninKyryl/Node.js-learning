import React, {Component} from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: {
        email: '',
        password: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.Logging = this.Logging.bind(this);
    this.Registration = this.Registration.bind(this);
  }

  handleChange(event) {
    let err = this.state.err;
    err[event.target.id] = '';
    this.setState({[event.target.id]: event.target.value, err: err});
  }

  //todo axios DONE
  Logging() {
    let {Login} = this.props;
    let {email, password} = this.state;

    axios.post('/api/guest/login', {email, password})
      .then(response => Login(response.data))
      .catch(error => {
        console.log('Login error', error.response);
        let err = error.response.data.message;
        this.setState({err});
      });
  }

  //todo axios DONE
  Registration() {
    let {Login} = this.props;
    let {email, password} = this.state;

    axios.put('/api/guest/registration', {email, password})
      .then(response => Login(response.data))
      .catch(error => {
        console.log('Registration error', error.response);
        let err = error.response.data.message;
        this.setState({err});
      });
  }

  render() {
    let className = "login-form";
    return (
      <form id={className}>
        <label>Email
          <Input className={className} value={this.state.email} type={'text'} id={'email'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.email}</div>
        </label>
        <label>Password
          <Input className={className} value={this.state.password} type={'password'} id={'password'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.password}</div>
        </label>
        <input type="button" value="Login" id="login" onClick={this.Logging}/>
        <input type="button" value="Registration" id="registration" onClick={this.Registration}/>
      </form>
    )
  }
}


export default Login;
