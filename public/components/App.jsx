import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import Login from './LoginLogout/Login.jsx';
import Departments from './Department/Departments.jsx';
import Employee from './Employee/Employee.jsx';
import Header from './Header/Header.jsx';
import Chat from "./Chat/Chat.jsx";

import {getIsLogin} from "../actions/loginTracks";

function IsLoginTrue() {
  return (
    <Router>
      <Switch>
        <Route exact path='/departments' render={() => {
          return (
            <div className='root'>
              <Departments/>
              <Chat/>
            </div>
          )
        }}/>
        <Route exact path='/departments/:departmentId' render={(props) => {
          return checkCorrectURL(props);
        }}/>
        <Redirect exact from='/guest' to='/departments'/>
        <Redirect exact from='/' to='/departments'/>
        <Route path='*' render={() =>
          <div className='not-found'>
            <Link to="/departments" replace>Page not found!</Link>
          </div>}/>
      </Switch>
    </Router>
  )
}

function IsLoginFalse() {
  return (
    <Switch>
      <Route exact path='/guest' component={Login}/>
      <Redirect exact from='/departments' to='/guest'/>
      <Redirect exact from='/departments/:departmentId' to='/guest'/>
      <Redirect exact from='/' to='/guest'/>
      <Route exact path='*'
             render={() =>
               <div className='not-found'>
                 <Link to="/guest" replace>Page not found!</Link>
               </div>}/>
    </Switch>
  )

}

function checkCorrectURL(props) {
  let {match} = props;
  let {departmentId} = match.params;
  if (isFinite(departmentId)) {
    return (
      <div className='root'>
        <Employee departmentId={departmentId}/>
        <Chat/>
      </div>
    )
  } else {
    return (
      <div className='not-found'>
        <Link to="/departments" replace>Page not found!</Link>
      </div>
    )
  }
}

class App extends Component {
  componentDidMount() {
    this.props.isLogin();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.login.isLogin !== nextProps.login.isLogin;
  }

//todo move render to outside DONE
  render() {
    let {isLogin} = this.props.login;
    return (
      <Router>
        <Header/>
        {isLogin ? <IsLoginTrue/> : <IsLoginFalse/>}
      </Router>
    )
  }
}

export default connect(
  state => ({
    login: state.login
  }),
  dispatch => ({
    isLogin: () => dispatch(getIsLogin()),
  })
)(App)


