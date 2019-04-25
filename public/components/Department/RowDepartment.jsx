import React, {Component} from "react";
import {Link} from "react-router-dom";
import DepartmentsPostForm from "../../forms/departmentForms/DepartmentPostForm.jsx";
import DeleteDepartmentForm from "../../forms/departmentForms/DepartmentDeleteForm.jsx";

export default class RowDepartment extends Component {
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
    let toEmployeeURL = `/departments/${id}`;
    return (
      <div className='table-row'>
        <DepartmentsPostForm
          form={`dep${this.props.department.id}`}
          initialValues={this.props.department}
          onSubmit={this.props.saveDepartment}/>
        <DeleteDepartmentForm
          form={`depDelete${this.props.department.id}`}
          initialValues={this.props.department}
          onSubmit={this.props.removeDepartment}/>
        <span className='long-span'>
          <button className='table-button button-link'>
            <Link onClick={()=>this.props.resetDepartments()} to={toEmployeeURL}>Employee</Link>
          </button>
        </span>
      </div>
    );
  }
}
