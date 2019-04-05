import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteEmployee, postEmployee} from "../../reducers/tracks/employeeTracks";
import {DeleteEmployeeForm, EmployeeForm, validate} from "../../forms/EmployeeForms.jsx";
import {reduxForm} from "redux-form";


class RowEmployee extends Component {
  constructor(props) {
    super(props);

    this.EmployeeForm = reduxForm({
      form: `emp${this.props.employee.id}`,
      validate
    })(EmployeeForm);

    this.DeleteEmployeeForm = reduxForm({
      form: `empDelete${this.props.employee.id}`
    })(DeleteEmployeeForm);

  }

  render() {

    const EmployeeForm = this.EmployeeForm;
    const DeleteEmployeeForm = this.DeleteEmployeeForm;
    return (
      <tr>
        <td colSpan='4'>
          <EmployeeForm initialValues={this.props.employee} onSubmit={this.props.saveEmployee}/>
        </td>
        <td>
          <DeleteEmployeeForm initialValues={this.props.employee} onSubmit={this.props.removeEmployee}/>
        </td>
      </tr>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    saveEmployee: (employee) => dispatch(postEmployee(employee)),
    removeEmployee: (employee) => dispatch(deleteEmployee(employee)),

  })
)(RowEmployee)
