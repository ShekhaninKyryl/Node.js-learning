import React, {Component, PureComponent} from "react";
import {connect} from 'react-redux';
import TableDepartment from './TableDepartment.jsx';
import {getDepartments} from "../../reducers/Actions/departmentTracks";


class Departments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDepartments();
  }
//todo not inline
  render() {
    return (
      <div style={{height: '100%', display: 'flex'}}>
        <div className='table-main'>
          <TableDepartment/>
        </div>
        <div className='chat-main'>
        </div>
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

