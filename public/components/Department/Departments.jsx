import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableDepartment from './TableDepartment.jsx';
import ActionsDepartment from './ActionsDepartment.jsx';


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
    ActionsDepartment.saveDepartment(department)
      .then(res => {
        if (res.error.error) {

        } else {
          let departments = this.state.departments.map(dep => {
            if (dep.id === id) {
              dep.name = name;
            }
            return dep;
          });
          this.setState({departments});
        }
      });
  }

  removeDepartment(department) {
    ActionsDepartment.removeDepartment(department)
      .then(res => {
        if (res.error.error) {

        } else {
          return ActionsDepartment.getDepartments();
        }
      })
      .then(res => {
        this.setState({departments: res.result});
        return true;
      });
  }

  putDepartment(department) {
    return ActionsDepartment.putDepartment(department)
      .then(res => {
        if (res.error.error) {
          return Promise.reject(res.error.message);
        } else {
          return ActionsDepartment.getDepartments();
        }
      })
      .then(res => {
        this.setState({departments: res.result});
        return true;
      });
  }

  componentDidMount() {
    ActionsDepartment.getDepartments()
      .then(res => {
        if (res.result) {
          return this.setState({departments: res.result});
        } else {
          return Promise.reject(res.error);
        }
      })
      .catch(err => console.log(err));
  }


  render() {
    return (
      <div>
        <TableDepartment departments={this.state.departments}
                         saveDepartment={this.saveDepartment}
                         removeDepartment={this.removeDepartment}
                         putDepartment={this.putDepartment}/>
      </div>
    )
  };
}

export default Departments;

