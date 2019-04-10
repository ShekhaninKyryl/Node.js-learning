import React, {Component, PureComponent} from "react";
import {connect} from "react-redux";
import {postDepartment, deleteDepartment} from "../../reducers/Actions/departmentTracks";
import {DepartmentForms, DeleteRowDepartmentForm, validate} from "../../forms/DepartmentForms.jsx";
import {reduxForm} from "redux-form";
import {Link} from "react-router-dom";

class RowDepartment extends Component {
  constructor(props) {
    super(props);

    this.RowDepartmentForm = reduxForm({
      form: `dep${this.props.department.id}`,
      validate,
      enableReinitialize: true
    })(DepartmentForms);
    this.DeleteRowDepartmentForm = reduxForm({
      form: `depDelete${this.props.department.id}`,
    })(DeleteRowDepartmentForm);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    for (let key in this.props.department) {
      if (this.props.department[key] === nextProps.department[key]) {
        continue;
      }
      return true;
    }
    return false;
  }

  render() {
    let {id} = this.props.department;
    const RowDepForm = this.RowDepartmentForm;
    const DelRowDepForm = this.DeleteRowDepartmentForm;

    let toEmployeeURL = `/departments/${id}`;
    //todo LINK DONE
    return (
      <div className='table-row'>
        <RowDepForm initialValues={this.props.department} onSubmit={this.props.saveDepartment}/>
        <DelRowDepForm initialValues={this.props.department} onSubmit={this.props.removeDepartment}/>
        <span className='long-span'>
        <button className='table-button button-link'>
          <Link to={toEmployeeURL}>Employee</Link>
        </button>
          </span>
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
