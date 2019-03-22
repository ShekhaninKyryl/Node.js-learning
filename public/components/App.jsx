import React, {Component} from "react";
import ReactDOM from "react-dom";
import Input from "./Input.jsx";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Login from './Login.jsx'
import Departments from './Department/Departments.jsx'
import Employee from './Employee/Employee.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      render: 'guest',
      departmentsId: ''
    };
    this.Login = this.Login.bind(this);
    this.handleChangeRender = this.handleChangeRender.bind(this);
  }

  Login(res) {
    let {result, renderPath} = res;
    if (result.status === 'ok') {
      this.setState({login: true});
      this.setState({render: renderPath})
    } else {
      this.setState({login: false});
      this.setState({render: 'guest'})
    }
  }

  handleChangeRender(obj) {
    let id;
    let render;
    {
      try {
        id = obj.attributes.id.nodeValue;
      } catch {
        id = '';
      }
      try {
        render = obj.attributes.render.nodeValue;
      } catch {
        render = 'guest'
      }
    }
    this.setState({render: render}, () => {
    });
    this.setState({departmentsId: id});
  }

//todo react-router
  render() {
    return (
      <Router>
        <Route path='/' component={Login}/>
        <Route path="/departments/" component={Departments}/>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));
