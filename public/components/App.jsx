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
    };
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
  }

  Login(res) {
    let {result} = res;
    if (result === 'ok') {
      this.setState({login: true});
    } else {
      console.log(res.error.message);
      this.setState({login: false});
    }
  }

  Logout(res) {
    let {result} = res;
    if (result === 'ok') {
      this.setState({login: false});
    } else {
      console.log(res.error.message);
      this.setState({login: true});
    }
  }

  /*
  * I`m authorized?
  * */
  componentDidMount() {
    ActionDepartments.getDepartments()
      .then(res => {
        if (res.result) {
          this.setState({login: true});
        }
      });
  }

//todo react-router Done
  render() {
    if (this.state.login) {
      return (
        <Router>
          <Switch>
            <Route exact path='/departments' component={Departments}/>
            <Route exact path='/departments/:departmentId' component={Employee}/>
            <Route path='*'
                   render={() =>
                     <Redirect to='/departments'/>
                   }/>
          </Switch>
          <Route render={() => {
            return (<Logout Logout={this.Logout}/>)
          }}/>

        </Router>
      );
    } else {
      return (
        <Router>
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

ReactDOM.render(<App/>, document.getElementById("root"));
