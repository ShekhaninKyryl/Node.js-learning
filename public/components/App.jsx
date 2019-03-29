import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';

import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Departments from './Department/Departments.jsx';
import Employee from './Employee/Employee.jsx';

import Header from './Header.jsx';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      id: '',
      name: 'Guest',
      email: ''
    };
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  Login(res) {
    this.setState({login: (res === 'ok')});
  }

  Logout(res) {
    console.log('App Logout');
    this.setState({login: !(res === 'ok')});
  }

  //toto additional data object
  //todo axios getUser DONE
  getUser(result) {
    this.setState({login: result});
  }

//todo react-router Done
  render() {

    if (this.state.login) {
      return (
        <Router>
          <Header login={this.state.login} logoutFn={this.Logout} getUser={this.getUser}/>
          <Switch>
            <Route exact path='/departments' component={Departments}/>
            <Route exact path='/departments/:departmentId' component={Employee}/>
            <Redirect exact from='/guest' to='/departments'/>
            <Route path='*' render={() => <Link to="/departments" replace>Page not found!</Link>}/>
          </Switch>

        </Router>
      );
    } else {
      return (
        <Router>
          <Header login={this.state.login} getUser={this.getUser}/>
          <Switch>
            <Route exact path='/guest'
                   render={() =>
                     <Login Login={this.Login}/>
                   }/>

            <Redirect exact from='/departments' to='/guest'/>
            <Redirect exact from='/departments/:departmentId' to='/guest'/>
            <Redirect exact from='/' to='/guest'/>
            <Route path='*' render={() => <Link to="/guest" replace>Page not found!</Link>}/>
          </Switch>
        </Router>
      );
    }
  }

}

ReactDOM
  .render(
    <App/>,
    document
      .getElementById(
        "root"
      )
  )
;
