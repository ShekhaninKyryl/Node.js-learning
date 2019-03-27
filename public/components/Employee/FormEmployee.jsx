import React, {Component} from "react";
import ReactDOM from "react-dom";
import Input from "../Input.jsx";


class FormEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pay: '',
      email: '',
      department: '',
      err: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.putEmployee = this.putEmployee.bind(this);
  }

  handleChange(event) {
    let err = this.state.err;
    err[event.target.id] = '';
    this.setState({[event.target.id]: event.target.value, err: err});
  }

  componentDidMount() {
    let {department} = this.props;
    this.setState({department: department})
  }

  putEmployee() {
    let {name, pay, email, department} = this.state;
    let putEmployee = this.props.putEmployee;
    putEmployee({name, pay, email, department})
      .then(res => {
        if (res.err) {
          this.setState({err: res.err.message})
        } else {
          this.setState({name: '', pay: '', email: ''});
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let className = "employee-form";
    let {name, pay, email} = this.state;
    return (
      <tr>
        <td>
          <Input className={className} value={name} type={'text'} id={'name'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.name}</div>
        </td>
        <td>
          <Input className={className} value={pay} type={'text'} id={'pay'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.pay}</div>
        </td>

        <td>
          <Input className={className} value={email} type={'text'} id={'email'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.email}</div>
        </td>
        <td colSpan='2'>
          <input type="button" value="Create" onClick={this.putEmployee}/>
        </td>
      </tr>
    )
  }
}


export default FormEmployee;
