import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableEmployee from './TableEmployee.jsx'
import ActionsEmployee from './ActionsEmployee.jsx'
import is401 from "../utilities/authorizationService";
import {Link} from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      err: null
    };

    this.saveEmployee = this.saveEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
    this.putEmployee = this.putEmployee.bind(this);
  }

  saveEmployee(employee) {
    let {Logout} = this.props;
    let {id} = employee;
    return ActionsEmployee.saveEmployee(employee)
      .then(response => {
        console.log('Save employee:', response);
        let {employees} = this.state;
        let index = employees.findIndex(element => element.id === id);
        employees[index] = response;
        this.setState({employees});
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  };

  removeEmployee(employee) {
    let {Logout} = this.props;
    let {id} = employee;
    ActionsEmployee.removeEmployee(employee)
      .then(response => {
        console.log('Remove employee:', response);
        let {employees} = this.state;
        let index = employees.findIndex(element => element.id === id);
        employees.splice(index, 1);
        this.setState({employees});
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  }

  //todo remove reGet request
  putEmployee(employee) {
    let {Logout} = this.props;
    return ActionsEmployee.putEmployee(employee)
      .then(response => {
        console.log('Put employee:', response);
        let {employees} = this.state;
        employees.push(response);
        this.setState(employees);
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  }

  componentDidMount() {
    console.log('Employee', this.props);
    let {Logout} = this.props;
    let department = this.props.departmentId;
    ActionsEmployee.getEmployees(department)
      .then(res => this.setState({employees: res, err: null}))
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error))
      .catch(error => {
        let err = error.response.data.message;
        console.log('Get employees err', err);

        this.setState({err});
      });
  }

  render() {
    let department = this.props.departmentId;
    if (this.state.err) {
      return <Link to="/departments" replace>{this.state.err.department}</Link>
    } else {
      return (
        <div>
          <TableEmployee employees={this.state.employees}
                         department={department}
                         saveEmployee={this.saveEmployee}
                         removeEmployee={this.removeEmployee}
                         putEmployee={this.putEmployee}/>
        </div>
      )
    }
  };
}

export default Employee;
