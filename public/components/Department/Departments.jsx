import React, {Component} from "react";
import TableDepartment from './TableDepartment.jsx';
import ActionsDepartment from './ActionsDepartment.jsx';

import is401 from '../utilities/authorizationService.js';


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

  //todo react use state (hooks) DONE
  saveDepartment(department) {
    let {Logout} = this.props;
    let {id, name} = department;
    return ActionsDepartment.saveDepartment(department)
      .then(response => {
        console.log('Save department:', response);
        let {departments} = this.state;
        let index = departments.findIndex(element => element.id === id);
        departments[index].name = name;
        this.setState({departments});
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  }

  removeDepartment(department) {
    let {Logout} = this.props;
    let {id} = department;
    ActionsDepartment.removeDepartment(department)
      .then(response => {
        console.log('Remove department:', response);

        let {departments} = this.state;
        let index = departments.findIndex(element => element.id === id);
        departments.splice(index, 1);
        this.setState({departments});
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  }

  putDepartment(department) {
    let {Logout} = this.props;
    return ActionsDepartment.putDepartment(department)
      .then(response => {
        console.log('Put department:', response);

        let {departments} = this.state;
        departments.push(response);
        this.setState({departments});
      })
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error));
  }

  componentDidMount() {
    let {Logout} = this.props;
    ActionsDepartment.getDepartments()
      .then(res => this.setState({departments: res}))
      .catch(error => is401(error) ? Logout('ok', 'Have to authorize!') : Promise.reject(error))
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

