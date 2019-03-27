import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';

import Login from './Login.jsx'
import Logout from './Logout.jsx'
import Departments from './Department/Departments.jsx'
import ActionDepartments from './Department/ActionsDepartment.jsx'
import Employee from './Employee/Employee.jsx'

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
    this.isAuthorized = this.isAuthorized.bind(this);
  }

  Login(res) {
    let {result} = res;
    if (result === 'ok') {
      this.isAuthorized();
    } else {
      console.log(res.err);
      this.setState({login: false});
    }
  }

  Logout(res) {
    let {result} = res;
    if (result === 'ok') {
      this.setState({login: false, id: '', name: 'Guest', email: ''});
    } else {
      console.log(res.err);
    }
  }

  isAuthorized() {
    return fetch(`/user`,
      {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
      })
      .then(res => res.json())
      .then(res => {
        if (res.result) {
          this.setState({...res.result, login: true});
          return true
        } else {
          this.setState({login: false});
          return false;
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.isAuthorized();
  }

//todo react-router Done
  render() {

    if (this.state.login) {
      return (
        <Router>
          <div>
            {`Hello ${this.state.name}. email: ${this.state.email}`}
          </div>
          <Switch>
            <Route exact path='/departments' component={Departments}/>
            <Route exact path='/departments/:departmentId' component={Employee}/>
            <Route path='*'
                   render={() => {

                     return <Redirect to='/departments'/>
                   }}/>
          </Switch>
          <Route render={() => {
            return (<Logout Logout={this.Logout}/>)
          }}/>

        </Router>
      );
    } else {
      return (
        <Router>
          <div>{`Hello ${this.state.name}.`}   </div>
          <Switch>
            <Route exact path='/guest'
                   render={() => {
                     return (<Login Login={this.Login}/>)
                   }}/>
            <Route path='*'
                   render={() => {
                     return (<Redirect to='/guest'/>);
                   }}/>
          </Switch>
        </Router>
      );
    }
  }

}

ReactDOM.render(<App/>, document.getElementById("root")
)
;
