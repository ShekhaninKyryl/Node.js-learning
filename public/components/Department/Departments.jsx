import React, {Component, PureComponent} from "react";
import {connect} from 'react-redux';
import TableDepartment from './TableDepartment.jsx';
import {getDepartments} from "../../Actions/departmentTracks";
import Chat from "../Chat/Chat.jsx";


class Departments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDepartments();
  }
//todo not inline DONE
  render() {
    return (
        <div className='table-main'>
          <TableDepartment/>
        </div>
    )
  };
}

export default connect(
  state => ({}),
  dispatch => ({
    getDepartments: () => dispatch(getDepartments())
  })
)
(Departments);

