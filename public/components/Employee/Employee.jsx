import React, {Component} from "react";
import TableEmployee from './TableEmployee.jsx'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {
  deleteEmployee,
  getEmployees,
  postEmployee,
  putEmployee,
  resetEmployees
} from "../../actions/employeeTracks";


class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
  }

  componentDidMount() {
    let department = this.props.departmentId;
    this.props.getEmployees(department)
      .catch(err => {
        this.setState({err})
      });
  }

  render() {
    if (this.state.err) {
      console.log("err:", this.state.err);
      return (
        <div className='not-found'>
          <Link onClick={() => this.setState({err: ''})}
                to='/departments'>{`Department ${this.props.departmentId} not found!`}</Link>
        </div>
      )
    } else {
      return <TableEmployee
        departmentId={this.props.departmentId}
        employees={this.props.employees}
        saveEmployee={this.props.saveEmployee}
        removeEmployee={this.props.removeEmployee}
        putEmployee={this.props.putEmployee}
        resetEmployees={this.props.resetEmployees}
      />;
    }
  }
}

export default connect(
  state => ({
    employees: state.employees
  }),
  dispatch => ({
    getEmployees: (departmentId) => dispatch(getEmployees(departmentId)),
    saveEmployee: (employee) => dispatch(postEmployee(employee)),
    removeEmployee: (employee) => dispatch(deleteEmployee(employee)),
    putEmployee: (employee) => dispatch(putEmployee(employee)),
    resetEmployees: (employee) => dispatch(resetEmployees(employee)),
  })
)(Employee);
