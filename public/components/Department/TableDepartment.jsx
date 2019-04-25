import React, {Component} from "react";
import RowDepartment from './RowDepartment.jsx'
import PutDepartmentsForm from "../../forms/departmentForms/DepartmentPutForm.jsx";

//todo formik
export default class TableDepartment extends Component {
  render() {
    let {departments} = this.props;
    let rows = departments.map(dep => {
      return <RowDepartment
        key={dep.id}
        department={dep}
        saveDepartment={this.props.saveDepartment}
        removeDepartment={this.props.removeDepartment}
        resetDepartments={this.props.resetDepartments}/>
    });
    return (
      <div className='table-main'>
        <div className='table-head'>
          <span>Department name</span>
          <span>Employees number</span>
          <span>Average payment</span>
        </div>
        <div className='chat-messages'>
          {rows}
        </div>
        <div className='table-footer'>
          <PutDepartmentsForm onSubmit={this.props.putDepartment}/>
        </div>
      </div>
    )
  }
}
