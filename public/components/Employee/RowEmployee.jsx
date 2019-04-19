import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteEmployee, postEmployee} from "../../Actions/employeeTracks";
import {DeleteEmployeeForm, EmployeeForm, validate} from "../../forms/EmployeeForms.jsx";
import {reduxForm} from "redux-form";


class RowEmployee extends Component {
  constructor(props) {
    super(props);

    this.EmployeeForm = reduxForm({
      form: `emp${this.props.employee.id}`,
      validate,
      enableReinitialize: true
    })(EmployeeForm);

    this.DeleteEmployeeForm = reduxForm({
      form: `empDelete${this.props.employee.id}`
    })(DeleteEmployeeForm);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    for(let key in this.props.employee){
      if(this.props.employee[key] === nextProps.employee[key]){
        continue;
      }
      return true;
    }
    return false;
  }


  render() {
    const EmployeeForm = this.EmployeeForm;
    const DeleteEmployeeForm = this.DeleteEmployeeForm;
    return (
      <div className='table-row'>
          <EmployeeForm initialValues={this.props.employee} onSubmit={this.props.saveEmployee}/>
          <DeleteEmployeeForm initialValues={this.props.employee} onSubmit={this.props.removeEmployee}/>
      </div>
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
