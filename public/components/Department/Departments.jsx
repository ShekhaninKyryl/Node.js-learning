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
    return ActionsDepartment.saveDepartment(department)
      .then(res => {
        if (res.err) {
          return res.err;
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
        if (res.err) {

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
        if (res.err) {
          return res;
        } else {
          return ActionsDepartment.getDepartments()
            .then(res => {
              if (!res.err) {
                this.setState({departments: res.result});
                return true;
              } else {
                return res;
              }
            });
        }
      });
  }

  componentDidMount() {
    ActionsDepartment.getDepartments()
      .then(res => {
        if (res.result) {
          return this.setState({departments: res.result});
        } else {
          return Promise.reject(res.err);
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

