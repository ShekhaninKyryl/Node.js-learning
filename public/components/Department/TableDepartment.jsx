import React, {Component, PureComponent} from "react";
import RowDepartment from './RowDepartment.jsx'
import FormDepartment from './FormDepartment.jsx';
import {connect} from "react-redux";

class TableDepartment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {departments} = this.props;
    let rows = departments.map(dep => {
      return <RowDepartment key={dep.id} department={dep}/>
    });
    return (
      <div>
        <div className='table-head'>
          <span>Department name</span>
          <span>Employees number</span>
          <span>Average payment</span>
          <hr/>
        </div>
        {rows}
        <div className='edge'/>
        <FormDepartment/>
      </div>
    )
  }
}

export default connect(
  state => ({
    departments: state.departments
  })
)(TableDepartment)
