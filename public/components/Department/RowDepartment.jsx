import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Redirect} from 'react-router';

import ReactDOM from "react-dom";

class RowDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      employeeCount: '',
      averagePayment: '',
      redirect: false
    };
    this.onChange = this.onChange.bind(this);

    this.saveDepartment = this.saveDepartment.bind(this);
    this.removeDepartment = this.removeDepartment.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }

  componentDidMount() {
    let {id, name, employeeCount, averagePayment} = this.props.department;
    this.setState({id, name, employeeCount, averagePayment});
  }

  saveDepartment() {
    let {id, name} = this.state;
    this.props.saveDepartment({id, name});
  }

  removeDepartment() {
    let {id, name} = this.state;
    this.props.removeDepartment({id, name});
  }

  render() {
    let {id, name, employeeCount, averagePayment} = this.state;
    let {redirect} = this.state;

    if (redirect) {
      let url = `/departments/${id}`;
      return (
        <Redirect to={url}/>
      )
    } else {
      return (
        <tr>
          <td><input type='text' id='name' value={name} onChange={this.onChange}/></td>
          <td>{employeeCount}</td>
          <td>{averagePayment}</td>
          <td>
            <button onClick={()=>{ return this.setState({redirect: true})}}>Employee</button>
          </td>
          <td>
            <button onClick={this.saveDepartment}>Save</button>
          </td>
          <td>
            <button onClick={this.removeDepartment}>Remove</button>
          </td>
        </tr>

      )
    }
  }
}


export default RowDepartment
