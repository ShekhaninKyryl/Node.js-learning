import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';

import Login from './Login.jsx'
import Logout from './Logout.jsx'
import Departments from './Department/Departments.jsx'
import Employee from './Employee/Employee.jsx'
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
    if (res === 'ok') {
      this.getUser();
    } else {
      this.setState({login: false});
    }
  }

  Logout(res) {
    if (res === 'ok') {
      this.setState({login: false, id: '', name: 'Guest', email: ''});
    }
  }

  //todo axios DONE
  getUser() {
    axios.get('/api/user')
      .then(response => this.setState({...response.data, login: true}))
      .catch(error => {
        this.setState({login: false});
        console.log('Get user error:', error.response);
      });
  }

  componentDidMount() {
    this.getUser();
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
