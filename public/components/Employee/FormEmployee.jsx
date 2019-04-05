import React, {Component} from "react";
import {connect} from "react-redux";
import {putEmployee} from "../../reducers/tracks/employeeTracks";
import {PutEmployeeForm, validate} from "../../forms/EmployeeForms.jsx";
import {reduxForm} from "redux-form";


class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.PutEmployeeForm = reduxForm({
      form: 'empPut',
      department: this.props.department,
      validate
    })(PutEmployeeForm);
  }

  render() {
    const PutEmployeeForm = this.PutEmployeeForm;
    let {department} = this.props;
    return (<PutEmployeeForm onSubmit={(value) => this.props.putEmployee({...value, department})}/>)
  }
}

export default connect(
  state => ({
    department: state.api.departmentId,
  }),
  dispatch => ({
    putEmployee: (employee) => dispatch(putEmployee(employee)),

  })
)(FormEmployee);
