import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableDepartment from "./TableDepartment.jsx";


class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: []
    };

    this.saveDepartment = this.saveDepartment.bind(this);
    this.removeDepartment = this.removeDepartment.bind(this);
    this.putDepartment = this.putDepartment.bind(this);
  }

  saveDepartment(department) {
    let {id, name} = department;
    fetch(`/departments/${id}/action_save`,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {

        } else {
          let departments = this.state.departments.map(dep => {
            if (dep.id === id) {
              dep.name = name;
              return dep;
            } else {
              return dep;
            }
          });
          this.setState({departments});

        }
      });
  }

  removeDepartment(department) {
    let {id, name} = department;
    fetch(`/departments/${id}/action_remove`,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {

        } else {
          return fetch('/departments',
            {
              method: 'get',
            }).then(res => res.json())
            .then(res => {
              this.setState({departments: res.result});
              return true;
            });
        }
      });
  }

  putDepartment(department) {
    let {name} = department;
    return fetch('/departments/action_add',
      {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name}),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error.error) {
          return Promise.reject(res);
        } else {
          return fetch('/departments',
            {
              method: 'get',
            });
        }
      })
      .then(res => res.json())
      .then(res => {
        this.setState({departments: res.result});
        return true;
      });
  }

  componentDidMount() {
    fetch('/departments',
      {
        method: 'get',
      }).then(res => res.json())
      .then(res => this.setState({departments: res.result}));

  }


  render() {
    let {changeRender} = this.props;
    return (
      <div>
        <TableDepartment departments={this.state.departments}
                         changeRender={changeRender}
                         saveDepartment={this.saveDepartment}
                         removeDepartment={this.removeDepartment}
                         putDepartment={this.putDepartment}/>
      </div>
    )
  }
  ;
}

export default Departments;

