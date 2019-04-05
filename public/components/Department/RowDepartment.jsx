import React, {Component} from "react";
import {connect} from "react-redux";
import {postDepartment, deleteDepartment} from "../../reducers/tracks/departmentTracks";
import {DepartmentForms, DeleteRowDepartmentForm, validate} from "../../forms/DepartmentForms.jsx";
import {reduxForm} from "redux-form";

class RowDepartment extends Component {
  constructor(props) {
    super(props);

    this.RowDepartmentForm = reduxForm({
      form: `dep${this.props.department.id}`,
      validate
    })(DepartmentForms);
    this.DeleteRowDepartmentForm = reduxForm({
      form: `depDelete${this.props.department.id}`,
    })(DeleteRowDepartmentForm);
  }

  render() {
    let {id} = this.props.department;
    const RowDepForm = this.RowDepartmentForm;
    const DelRowDepForm = this.DeleteRowDepartmentForm;

    let toEmployeeURL = `/departments/${id}`;
    return (
      <div>
        <RowDepForm initialValues={this.props.department} onSubmit={this.props.saveDepartment}/>
        <DelRowDepForm initialValues={this.props.department} onSubmit={this.props.removeDepartment}/>
        <form action={toEmployeeURL}>
          <button type="submit">Employee</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({
    departments: state.departments,
    err: state.error
  }),
  dispatch => ({
    saveDepartment: (department) => dispatch(postDepartment(department)),
    removeDepartment: (department) => dispatch(deleteDepartment(department)),
  })
)(RowDepartment)
