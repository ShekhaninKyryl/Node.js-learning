import React, {Component} from "react";
import {connect} from "react-redux";
import {putDepartment} from "../../reducers/tracks/departmentTracks";
import {PutDepartmentsForm, validate} from "../../forms/RowDepartmentForm.jsx";
import {reduxForm} from "redux-form";

class FormDepartment extends Component {
  constructor(props) {
    super(props);

    this.PutDepartmentsForm = reduxForm({
      form: `depPUT`,
      validate
    })(PutDepartmentsForm);
  }


  render() {
    const PutDepartmentsForm = this.PutDepartmentsForm;
        return ( <PutDepartmentsForm onSubmit={this.props.putDepartment}/>)
  }
}

export default connect(
  state => ({
    departments: state.departments,
    err: state.error
  }),
  dispatch => ({
    putDepartment: (department) => dispatch(putDepartment(department))
  })
)(FormDepartment);
