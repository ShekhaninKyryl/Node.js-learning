import React, {Component} from "react";

class RowEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      pay: '',
      email: '',
      err:{},
      department: ''
    };
    this.onChange = this.onChange.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
  }

  onChange(event) {
    let err = this.state.err;
    err[event.target.id] = '';
    this.setState({[event.target.id]: event.target.value, err: err});
  }

  componentDidMount() {
    let {id, name, pay, email, department} = this.props.employee;
    this.setState({id, name, pay, email, department});
  }

  saveEmployee() {
    let {id, name, pay, email, department} = this.state;
    this.props.saveEmployee({id, name, pay, email, department})
      .catch(error => {
        console.log('Save employee error:', error.response);
        let err = error.response.data.message;
        this.setState({err});
      });
  }

  removeEmployee() {
    let {id, name, pay, email, department} = this.state;
    this.props.removeEmployee({id, name, pay, email, department})
      .catch(error => {
        console.log('Remove employee error:', error.response);
        // let err = error.response.data.message;
        // this.setState({err});
      });
  }

  render() {
    let {id, name, pay, email} = this.state;
    return (
      <tr>
        <td>
          <input type='text' id='name' value={name} onChange={this.onChange}/>
          <div>{this.state.err.name}</div>
        </td>
        <td>
          <input type='text' id='pay' value={pay} onChange={this.onChange}/>
          <div>{this.state.err.pay}</div>
        </td>
        <td>
          <input type='text' id='email' value={email} onChange={this.onChange}/>
          <div>{this.state.err.email}</div>
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


export default RowEmployee
