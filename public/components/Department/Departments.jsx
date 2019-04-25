import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import TableDepartment from './TableDepartment.jsx';
import {
  deleteDepartment,
  getDepartments,
  postDepartment,
  putDepartment,
  resetDepartments
} from "../../actions/departmentTracks";

class Departments extends PureComponent {
  componentDidMount() {
    this.props.getDepartments();
  }

  render() {
    return (
      <TableDepartment
        departments={this.props.departments}
        saveDepartment={this.props.saveDepartment}
        removeDepartment={this.props.removeDepartment}
        putDepartment={this.props.putDepartment}
        resetDepartments={this.props.resetDepartments}
      />
    )
  };
}

export default connect(
  state => ({
    departments: state.departments,
  }),
  dispatch => ({
    getDepartments: () => dispatch(getDepartments()),
    saveDepartment: (department) => dispatch(postDepartment(department)),
    removeDepartment: (department) => dispatch(deleteDepartment(department)),
    putDepartment: (department) => dispatch(putDepartment(department)),
    resetDepartments: (department) => dispatch(resetDepartments(department)),
  })
)
(Departments);

