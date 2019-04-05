import React, {Component} from "react";
import {Redirect} from 'react-router';
import {connect} from "react-redux";
import {postDepartment, deleteDepartment} from "../../reducers/tracks/departmentTracks";
import {RowDepartmentForm, DeleteRowDepartmentForm, validate} from "../../forms/RowDepartmentForm.jsx";
import {reduxForm} from "redux-form";

class RowDepartment extends Component {
  constructor(props) {
    super(props);

    this.RowDepartmentForm = reduxForm({
      form: `dep${this.props.department.id}`,
      validate
    })(RowDepartmentForm);
    this.DeleteRowDepartmentForm = reduxForm({
      form: `depDelete${this.props.department.id}`,
    })(DeleteRowDepartmentForm);
  }

  render() {
    let {id} = this.props.department;
    const RowDepForm = this.RowDepartmentForm;
    const DelRowDepForm = this.DeleteRowDepartmentForm;

    let url = `/departments/${id}`;
    return (
      <div>
        <RowDepForm initialValues={this.props.department} onSubmit={this.props.saveDepartment}/>
        <DelRowDepForm initialValues={this.props.department} onSubmit={this.props.removeDepartment}/>
        <form action={url}>
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
