import React, {Component} from "react";
import EmployeePostForm from "../../forms/employeeForms/EmployeePostForm.jsx";
import DeleteEmployeeForm from  "../../forms/employeeForms/EmployeeDeleteForm.jsx";

export default class RowEmployee extends Component {
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
    return (
      <div className='table-row'>
          <EmployeePostForm
            form={`emp${this.props.employee.id}`}
            initialValues={this.props.employee}
            onSubmit={this.props.saveEmployee}/>
          <DeleteEmployeeForm
            form={`empDelete${this.props.employee.id}`}
            initialValues={this.props.employee}
            onSubmit={this.props.removeEmployee}/>
      </div>
    )
  }
}

