import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Input from "./Input.jsx";


class Logout extends Component {
  constructor(props) {
    super(props);
    this.Logout = this.Logout.bind(this);
  }

  Logout() {
    let {Logout} = this.props;

    fetch('/logout',
      {
        method: 'get',
        headers: {"Content-Type": "application/json"},

      })
      .then(res => res.json())
      .then(res => Logout(res))
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
