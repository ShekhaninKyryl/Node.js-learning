import React, {Component} from "react";
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
        <div>
          <span>Department name</span>
          <span>Employees number</span>
          <span>Average payment</span>
        </div>
        {rows}
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
