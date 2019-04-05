import React, {Component} from "react";
import TableEmployee from './TableEmployee.jsx'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getEmployees} from "../../reducers/tracks/employeeTracks";

class Employee extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    let department = this.props.departmentId;
    this.props.setDepartmentId(department);
    this.props.getEmployees(department);
  }

  render() {
    if (this.props.err.department) {
      return <Link to="/departments" replace>{this.props.err.department}</Link>
    } else {
      return (
        <div>
          <TableEmployee/>
        </div>
      )
    }
  }
  ;
}

export default connect(
  state => ({
    api: state.api,
    err: state.error
  }),
  dispatch => ({
    getEmployees: (departmentId) => dispatch(getEmployees(departmentId)),
    setDepartmentId: (departmentId) => dispatch({type: 'SET_DEPARTMENTID', departmentId}),
  })
)(Employee);
