import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableEmployee from './TableEmployee.jsx'
import ActionsEmployee from './ActionsEmployee.jsx'

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };

    this.saveEmployee = this.saveEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
    this.putEmployee = this.putEmployee.bind(this);
  }

  saveEmployee(employee) {
    let {id} = employee;
    return ActionsEmployee.saveEmployee(employee)
      .then(response => {
        console.log('Save employee:', response);
        let {employees} = this.state;
        let index = employees.findIndex(element => element.id === id);
        employees[index] = response;
        this.setState({employees});
      });
  };

  removeEmployee(employee) {
    let {id} = employee;
    ActionsEmployee.removeEmployee(employee)
      .then(response => {
        console.log('Remove employee:', response);

        let {employees} = this.state;
        let index = employees.findIndex(element => element.id === id);
        employees.splice(index, 1);
        this.setState({employees});
      });
  }

  putEmployee(employee) {
    return ActionsEmployee.putEmployee(employee)
      .then(response => {
        console.log('Put employee:', response);
        let {employees} = this.state;
        employees.push(response);
        this.setState(employees);
      });
  }

  componentDidMount() {
    let department = this.props.match.params.departmentId;
    ActionsEmployee.getEmployees(department)
      .then(res => this.setState({employees: res}))
      .catch(error => console.log('Get employees err', error.response));
  }

  render() {
    let department = this.props.match.params.departmentId;
    return (
      <div>
        <TableEmployee employees={this.state.employees}
                       department={department}
                       saveEmployee={this.saveEmployee}
                       removeEmployee={this.removeEmployee}
                       putEmployee={this.putEmployee}/>
      </div>
    )
  };
}

export default Employee;
