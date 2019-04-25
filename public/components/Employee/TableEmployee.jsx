import React, {Component} from "react";
import RowEmployee from './RowEmployee.jsx'
import PutEmployeeForm from "../../forms/employeeForms/EmployeePutForm.jsx";

export default class TableEmployee extends Component {
  render() {
    let {employees} = this.props;
    let rows = employees.map(emp => {
      return <RowEmployee
        key={emp.id}
        employee={emp}
        saveEmployee={this.props.saveEmployee}
        removeEmployee={this.props.removeEmployee}/>
    });
    return (
      <div className='table-main'>
        <div className='table-head'>
          <span>Employee name</span>
          <span>Payment</span>
          <span>Email</span>
        </div>
        <div className='chat-messages'>
          {rows}
        </div>
        <div className='table-footer'>
          <PutEmployeeForm
            initialValues={{department: this.props.departmentId}}
            resetEmployees={this.props.resetEmployees}
            onSubmit={this.props.putEmployee}/>
        </div>
      </div>
    )
  }
}

