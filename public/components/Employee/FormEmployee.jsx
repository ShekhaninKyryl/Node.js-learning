import React, {Component} from "react";
import {connect} from "react-redux";
import {putEmployee} from "../../actions/employeeTracks";
import {PutEmployeeForm, validate} from "../../forms/EmployeeForms.jsx";
import {reduxForm} from "redux-form";


class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.PutEmployeeForm = reduxForm({
      form: 'empPut',
      validate
    })(PutEmployeeForm);
  }

  render() {
    const PutEmployeeForm = this.PutEmployeeForm;
    let {departmentId: department} = this.props;
    return (<PutEmployeeForm initialValues={{department}} onSubmit={this.props.putEmployee}/>)
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    putEmployee: (employee) => dispatch(putEmployee(employee)),
  })
)(FormEmployee);
