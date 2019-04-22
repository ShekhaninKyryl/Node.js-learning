import React, {Component} from "react";
import RowEmployee from './RowEmployee.jsx'
import FormEmployee from './FormEmployee.jsx';
import {connect} from "react-redux";

class TableEmployee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {employees} = this.props;
    let rows = employees.map(emp => {
      return <RowEmployee key={emp.id} employee={emp}/>
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
          <FormEmployee departmentId={this.props.departmentId}/>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    employees: state.employees
  })
)(TableEmployee)
