import React, {Component} from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";
import {connect} from "react-redux";
import is401 from "./utilities/authorizationService";


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

  //todo axios login DONE
  Logging() {
    let {email, password} = this.state;
    this.props.login({email, password});
  }

  //todo axios Registration DONE
  Registration() {
    let {email, password} = this.state;
    this.props.registration({email, password})
  }

  componentDidMount() {
    this.props.isLogin();
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


export default connect(
  state => ({
    api: state.api
  }),
  dispatch => ({
    login: (data) => {
      axios.post('/api/guest/login', data)
        .then(() => dispatch({type: 'SET_LOGIN'}))
        .catch(error => {
          console.log('login error', error.response);
          let err = error.response.data.message;
          this.setState({err});
        });
    },
    registration: (data) => {
      axios.put('/api/guest/registration', data)
        .then(() => dispatch({type: 'SET_LOGIN'}))
        .catch(error => {
          console.log('Registration error', error.response);
        });
    },
    isLogin: ()=>{
      axios.get('/api/guest')
        .then(() => dispatch({type: 'SET_LOGIN'}))
        .catch(error => {
          dispatch({type: 'SET_LOGOUT'});
        });
    }
  })
)(Login);
