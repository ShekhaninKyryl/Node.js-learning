import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableEmployee from './TableEmployee.jsx'

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
    let {id, name, pay, email, department} = employee;
    fetch(`/departments/${department}/employee/${id}/action_save`,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name, pay, email, department}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {

        } else {
          let employees = this.state.employees.map(emp => {
            if (emp.id === id) {
              emp.name = name;
              emp.pay = pay;
              emp.email = email;
              return emp;
            } else {
              return emp;
            }
          });
          this.setState({employees});
        }
      });
  };

  removeEmployee(employee) {
    let {id, name, pay, email, department} = employee;
    fetch(`/departments/${department}/employee/${id}/action_remove`,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {

        } else {
          return fetch(`/departments/${department}/employee`,
            {
              method: 'get',
            }).then(res => res.json())
            .then(res => {
              this.setState({employees: res.result});
              return true;
            });
        }
      });
  }

  putEmployee(employee) {
    let {name, pay, email, department} = employee;
     return fetch(`/departments/${department}/employee/action_add`,
      {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, pay, email, department}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {
          return Promise.reject(res);
        } else {
          return fetch(`/departments/${department}/employee`,
            {
              method: 'get',
            })
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({employees: res.result});
        return true;
      });
  }

  componentDidMount() {
    let department = this.props.match.params.departmentId;
    fetch(`/departments/${department}/employee`,
      {
        method: 'get',
      }).then(res => res.json())
      .then(res => this.setState({employees: res.result}));

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
