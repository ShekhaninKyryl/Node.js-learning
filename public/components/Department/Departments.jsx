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

  //todo react use state (hooks)
  saveDepartment(department) {
    let {id, name} = department;
    return ActionsDepartment.saveDepartment(department)
      .then(response => {
        console.log('Save department:', response);
        let {departments} = this.state;
        let index = departments.findIndex(element => element.id === id);
        departments[index].name = name;
        this.setState({departments});
      });
  }

  removeDepartment(department) {
    ActionsDepartment.removeDepartment(department)
      .then(response => {
        console.log('Remove department:', response);
        return ActionsDepartment.getDepartments();
      })
      .then(departments => {
        this.setState({departments});
        return true;
      });
  }

  putDepartment(department) {
    return ActionsDepartment.putDepartment(department)
      .then(response => {
        console.log('Put department:', response);
        return ActionsDepartment.getDepartments();
      })
      .then(departments => {
        this.setState({departments});
        return true;
      });
  }

  componentDidMount() {
    ActionsDepartment.getDepartments()
      .then(res => this.setState({departments: res}))
      .catch(error => console.log('Get Departments err', error.response));
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

