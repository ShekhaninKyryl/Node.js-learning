import React, {Component} from "react";
import {connect} from 'react-redux';
import TableDepartment from './TableDepartment.jsx';
import {getDepartments} from "../../actions/departmentTracks";

class Departments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDepartments();
  }

  render() {
    return (<TableDepartment/>)
  };
}

export default connect(
  state => ({}),
  dispatch => ({
    getDepartments: () => dispatch(getDepartments())
  })
)
(Departments);

