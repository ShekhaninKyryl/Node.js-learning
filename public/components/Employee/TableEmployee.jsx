import React, {Component} from "react";
import RowEmployee from './RowEmployee.jsx'
import FormEmployee from './FormEmployee.jsx';
import {Redirect} from "react-router";
import {connect} from "react-redux";


class TableEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  render() {
    let {employees} = this.props;
    let {redirect} = this.state;

    let rows = employees.map(emp => {
      return <RowEmployee key={emp.id} employee={emp}/>
    });

    if (redirect) {
      let url = `/departments`;
      return (
        <Redirect to={url}/>
      )
    } else {
      return (
        <table>
          <thead>
          <tr>
            <td>
              Name
            </td>
            <td>
              Payment
            </td>
            <td>
              Email
            </td>
          </tr>
          </thead>
          <tbody>
          {rows}
          <FormEmployee/>
          <tr>
            <td/>
            <td/>
            <td/>
            <td colSpan='2'>
              <button onClick={() => {
                return this.setState({redirect: true})
              }}>Departments
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      )
    }
  }
}

export default connect(
  state => ({
    employees: state.employees
  })
)(TableEmployee)
