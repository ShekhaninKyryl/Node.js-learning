import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";


class Logout extends Component {
  constructor(props) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }

  //todo axios
  Logout() {
    let {Logout} = this.props;

    axios.get('/api/logout')
      .then(response => Logout(response.data))
      .catch(error => console.log('Logout error:', error.response));

  }


  render() {

    return (
      <input style={
        {
          position: 'absolute',
          right: 0,
          top: 0
        }
      }
             type="button" value="Logout" id="login" onClick={this.Logout}/>
    )
  }
}


export default Logout;
