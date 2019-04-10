import React, {Component} from "react";
import RowEmployee from './RowEmployee.jsx'
import FormEmployee from './FormEmployee.jsx';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class TableEmployee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {employees} = this.props;
    let rows = employees.map(emp => {
      return <RowEmployee key={emp.id} employee={emp}/>
    });

    let toDepartmentURL = `/departments`;

    return (
      <div>
        <div className='table-head'>
          <span>Employee name</span>
          <span>Payment</span>
          <span>Email</span>
          <hr/>
        </div>
        {rows}
        <div className='edge'/>
        <FormEmployee departmentId={this.props.departmentId}/>
      </div>


    )

  }
}

export default connect(
  state => ({
    employees: state.employees
  })
)(TableEmployee)
