import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";
import {connect} from "react-redux";


class Logout extends Component {
  constructor(props) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }


  Logout() {
    this.props.logout();
  }


  render() {
    return (
      <input type="button" value="Logout" id="login" onClick={this.Logout}/>
    )
  }
}


export default connect(
  state => ({
    api: state.api
  }),
  dispatch => ({
    logout: () => {
      axios.get('/api/logout')
        .then(() => dispatch({type: 'SET_LOGOUT'}))
        .catch(error => console.log('Logout error:', error.response));
    }
  })
)(Logout);
