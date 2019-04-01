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
      causes: ''
    };
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  Login(res) {
    this.setState({login: (res === 'ok')});
  }

  Logout(res, causes) {
    this.setState({login: !(res === 'ok'), causes: causes});
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
            <Route exact path='/departments' render={() => <Departments Logout={this.Logout}/>}/>
            <Route exact path='/departments/:departmentId' render={({match}) => {
              //todo redirect to dep/empl or 404 DONE
              let {departmentId} = match.params;
              if (isFinite(departmentId)) {
                return <Employee departmentId={departmentId} Logout={this.Logout}/>
              } else {
                return <Link to="/departments" replace>Page not found!</Link>
              }
            }
            }/>
            <Redirect exact from='/guest' to='/departments'/>
            <Route path='*' render={() => <Link to="/departments" replace>Page not found!</Link>}/>
          </Switch>

        </Router>
      )
        ;
    } else {
      return (
        <Router>
          <Header login={this.state.login} getUser={this.getUser}/>
          <Switch>
            <Route exact path='/guest' render={() => <Login causes={this.state.causes} Login={this.Login}/>}/>
            <Route exact path='/departments' render={() => {
              this.setState({causes: 'You have to authorize!'});
              console.log('Dont auth!Dep', this.state);
              return <Redirect to='/guest'/>
            }}/>
            <Route exact path='/departments/:departmentId' render={() => {
              console.log('Dont auth!Empl', this.state);
              this.setState({causes: 'You have to authorize!'});
              return <Redirect to='/guest'/>
            }}/>
            <Redirect from='/' to='/guest'/>
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
