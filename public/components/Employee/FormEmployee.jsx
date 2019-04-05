import React, {Component} from "react";
import Input from "../Input.jsx";
import {connect} from "react-redux";
import {putEmployee} from "../../reducers/tracks/employeeTracks";


class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pay: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.putEmployee = this.putEmployee.bind(this);
  }

  handleChange(event) {

    this.setState({[event.target.id]: event.target.value});
  }

  putEmployee() {
    let {name, pay, email} = this.state;
    let {department} = this.props;
    if (this.props.putEmployee({name, pay, email, department})) {
      this.setState({name: '', pay: '', email: ''});
    }
  }

  render() {
    let className = "employee-form";
    let {name, pay, email} = this.state;
    return (
      <tr>
        <td>
          <Input className={className} value={name} type={'text'} id={'name'}
                 handleChange={this.handleChange}/>
          <div>{this.props.err.id === 0 ? this.props.err.name : ''}</div>
        </td>
        <td>
          <Input className={className} value={pay} type={'text'} id={'pay'}
                 handleChange={this.handleChange}/>
          <div>{this.props.err.id === 0 ? this.props.err.pay : ''}</div>
        </td>

        <td>
          <Input className={className} value={email} type={'text'} id={'email'}
                 handleChange={this.handleChange}/>
          <div>{this.props.err.id === 0 ? this.props.err.email : ''}</div>
        </td>
        <td colSpan='2'>
          <input type="button" value="Create" onClick={this.putEmployee}/>
        </td>
      </tr>
    )
  }
}
//todo some strange
export default connect(
  state => ({
    employees: state.employees,
    department: state.api.departmentId,
    err: state.error
  }),
  dispatch => ({
    putEmployee: (employee) => dispatch(putEmployee(employee)),

  })
)(FormEmployee);
