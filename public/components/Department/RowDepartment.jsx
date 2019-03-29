import React, {Component} from "react";
import {Redirect} from 'react-router';

class RowDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      employeeCount: '',
      averagePayment: '',
      err: {},
      redirect: false
    };
    this.onChange = this.onChange.bind(this);

    this.saveDepartment = this.saveDepartment.bind(this);
    this.removeDepartment = this.removeDepartment.bind(this);
  }

  onChange(event) {
    let err = this.state.err;
    err[event.target.id] = '';
    this.setState({[event.target.id]: event.target.value, err: err});
  }

  componentDidMount() {
    let {id, name, employeeCount, averagePayment} = this.props.department;
    this.setState({id, name, employeeCount, averagePayment});
  }

  saveDepartment() {
    let {id, name} = this.state;
    this.props.saveDepartment({id, name})
      .catch(error => {
        console.log('Save department error:', error.response);
        let err = error.response.data.message;
        this.setState({err});
      });
  }

  removeDepartment() {
    let {id, name} = this.state;
    let removeDepartment = this.props.removeDepartment;
    removeDepartment({id, name})
      .catch(error => {
        console.log('Remove department error:', error.response);
        // let err = error.response.data.message;
        // this.setState({err});
      });
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
          <td>
            <input type='text' id='name' value={name} onChange={this.onChange}/>
            <div>{this.state.err.name}</div>
          </td>
          <td>{employeeCount}</td>
          <td>{averagePayment}</td>
          <td>
            <button onClick={() => {
              return this.setState({redirect: true})
            }}>Employee
            </button>
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
