import React, {Component} from "react";
import ReactDOM from "react-dom";

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

  onChange(e) {
    this.setState({[e.target.id]: e.target.value})
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
        <td><input type='text' id='name' value={name} onChange={this.onChange}/></td>
        <td><input type='text' id='pay' value={pay} onChange={this.onChange}/></td>
        <td><input type='text' id='email' value={email} onChange={this.onChange}/></td>
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


export default RowEmployee
