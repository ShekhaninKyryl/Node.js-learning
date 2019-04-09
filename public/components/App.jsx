import React, {Component} from "react";

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';
import {connect} from 'react-redux';


import Login from './LoginLogout/Login.jsx';
import Departments from './Department/Departments.jsx';
import Employee from './Employee/Employee.jsx';
import Header from './Header/Header.jsx';
import {getIsLogin} from "../reducers/Actions/loginTracks";


function RenderEmployee(props){
  let {match} = props;
  let {departmentId} = match.params;
  if (isFinite(departmentId)) {
    return <Employee departmentId={departmentId}/>
  } else {
    return <Link to="/departments" replace>Page not found!</Link>
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.isLogin();
  }

  // todo use PURE Component

  render() {
    let {isLogin} = this.props.api;
    return (
      <Router>
        <Header/>
        {isLogin ? (
          <Switch>
            <Route exact path='/departments' component={Departments}/>
            <Route exact path='/departments/:departmentId' component={RenderEmployee}/>
            <Redirect exact from='/guest' to='/departments'/>
            <Redirect exact from='/' to='/departments'/>
            <Route path='*' render={() => <Link to="/departments" replace>Page not found!</Link>}/>
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/guest' component={Login}/>
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
        )}
      </Router>
    )
  }
}

export default connect(
  state => ({
    api: state.api
  }),
  dispatch => ({
    isLogin: () => dispatch(getIsLogin()),
  })
)(App)


