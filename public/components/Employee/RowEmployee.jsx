import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteEmployee, postEmployee} from "../../reducers/tracks/employeeTracks";


class RowEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      pay: '',
      email: '',
      department: ''
    };
    this.onChange = this.onChange.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
  }

  onChange(event) {

    this.setState({[event.target.id]: event.target.value});
  }

  componentDidMount() {
    let {id, name, pay, email, department} = this.props.employee;
    this.setState({id, name, pay, email, department});
  }

  saveEmployee() {
    let {id, name, pay, email, department} = this.state;
    this.props.saveEmployee({id, name, pay, email, department});
  }

  removeEmployee() {
    let {id, name, pay, email, department} = this.state;
    this.props.removeEmployee({id, name, pay, email, department});
  }

  render() {
    let {id, name, pay, email} = this.state;
    return (
      <tr>
        <td>
          <input type='text' id='name' value={name} onChange={this.onChange}/>
          <div>{this.props.err.id === id ? this.props.err.name : ''}</div>
        </td>
        <td>
          <input type='text' id='pay' value={pay} onChange={this.onChange}/>
          <div>{this.props.err.id === id ? this.props.err.pay : ''}</div>
        </td>
        <td>
          <input type='text' id='email' value={email} onChange={this.onChange}/>
          <div>{this.props.err.id === id ? this.props.err.email : ''}</div>
        </td>
        <td>
          <button id={id} onClick={this.saveEmployee}>Save</button>
        </td>
        <td>
          <button id={id} onClick={this.removeEmployee}>Remove</button>
        </td>
      </tr>
    )
  }
}

export default connect(
  state => ({
    employees: state.employees,
    err: state.error
  }),
  dispatch => ({
    saveEmployee: (employee) => dispatch(postEmployee(employee)),
    removeEmployee: (employee) => dispatch(deleteEmployee(employee)),

  })
)(RowEmployee)
