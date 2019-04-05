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

    let toDepartmentURL = `/departments`;

    return (
      <table>
        <thead>
        <tr>
          <td>Employee name</td>
          <td>Payment</td>
          <td>Email</td>

          <td/>
          <td/>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colSpan='5'>
            <hr/>
          </td>
        </tr>
        {rows}
        <hr/>
        </tbody>
        <div>
          <form action={toDepartmentURL}>
            <button type="submit">Departments</button>
          </form>
        </div>
        <hr/>
        <FormEmployee/>
      </table>
    )

  }
}

export default connect(
  state => ({
    employees: state.employees
  })
)(TableEmployee)
