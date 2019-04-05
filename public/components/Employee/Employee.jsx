import React, {Component} from "react";
import TableEmployee from './TableEmployee.jsx'
import {connect} from "react-redux";
import {getEmployees} from "../../reducers/tracks/employeeTracks";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    }

  }


  componentDidMount() {
    let department = this.props.departmentId;
    this.props.setDepartmentId(department);
    this.props.getEmployees(department)
      .catch(err => this.setState({err}));
  }

  render() {
    if (this.state.err) {
      return (
        <div>
          <Link onClick={() => this.setState({})} to='/departments'>Department not found!</Link>
        </div>
      )
    } else {
      return (
        <div>
          <TableEmployee/>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    api: state.api,
  }),
  dispatch => ({
    getEmployees: (departmentId) => dispatch(getEmployees(departmentId)),
    setDepartmentId: (departmentId) => dispatch({type: 'SET_DEPARTMENTID', departmentId}),
  })
)(Employee);
