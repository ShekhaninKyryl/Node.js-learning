import React, {Component} from "react";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';
import {connect} from 'react-redux';


import Login from './Login.jsx';
import Departments from './Department/Departments.jsx';
import Employee from './Employee/Employee.jsx';

import Header from './Header.jsx';
import axios from "axios";
import is401 from "./utilities/authorizationService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: axios.get('/api/guest')
        .then(response => {
          return response.data
        })
        .catch(error => is401(error) ? this.Logout('ok', 'Have to authorize!') : Promise.reject(error))
        .catch(err => console.log('Init:', err.response)),
      causes: ''
    };
    this.Logout = this.Logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  // login(res) {
  //   this.setState({login: (res === 'ok')});
  // }

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
    let{isLogin} = this.props.api;

    if (isLogin) {
      return (
        <Router>
          <Header login={isLogin} logoutFn={this.Logout} getUser={this.getUser}/>
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
            }}/>

            <Redirect exact from='/guest' to='/departments'/>
            <Redirect exact from='/' to='/departments'/>
            <Route path='*' render={() => <Link to="/departments" replace>Page not found!</Link>}/>

          </Switch>

        </Router>
      );
    } else {
      return (
        <Router>
          <Header login={isLogin} getUser={this.getUser}/>
          <Switch>

            <Route exact path='/guest' render={() => <Login/>}/>

            <Route exact path='/departments' render={() => {
              //this.setState({causes: 'You have to authorize!'});
              return <Redirect to='/guest'/>
            }}/>
            <Route exact path='/departments/:departmentId' render={() => {
              //this.setState({causes: 'You have to authorize!'});
              return <Redirect to='/guest'/>
            }}/>
            <Redirect exact from='/' to='/guest'/>

            <Route exact path='*' render={() => <Link to="/guest" replace>Page not found!</Link>}/>

          </Switch>
        </Router>
      );
    }
  }

}


export default connect(
  state => ({
    api: state.api
  }),
  dispatch=>({})
)(App)


