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
    let {id, name, pay, email} = employee;
    return ActionsEmployee.saveEmployee(employee)
      .then(res => {
        if (res.err) {
          return res.err
        } else {
          let employees = this.state.employees.map(emp => {
            if (emp.id === id) {
              emp.name = name;
              emp.pay = pay;
              emp.email = email;
            }
            return emp;
          });
          this.setState({employees});
        }
      });
  };

  removeEmployee(employee) {
    ActionsEmployee.removeEmployee(employee)
      .then(res => {
        if (res.result) {
          return ActionsEmployee.getEmployees(employee.department);
        } else {
          return Promise.reject(res);
        }
      })
      .then(res => {
        this.setState({employees: res.result});
        return true;
      });
  }

  putEmployee(employee) {
    return ActionsEmployee.putEmployee(employee)
      .then(res => {
        if (res.err) {
          return res;
        } else {
          return ActionsEmployee.getEmployees(employee.department)
            .then(res => {
              if (!res.err) {
                this.setState({employees: res.result});
                return true;
              } else {
                return res;
              }
            });
        }
      });
  }

  componentDidMount() {
    let department = this.props.match.params.departmentId;
    ActionsEmployee.getEmployees(department)
      .then(res => {
        if (res.result) {
          this.setState({employees: res.result});
        } else {
          console.log(res.err);
        }
      });

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
