import React, {Component} from "react";
import ReactDOM from "react-dom";
import RowDepartment from './RowDepartment.jsx'
import FormDepartment from './FormDepartment.jsx';

class TableDepartment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {departments} = this.props;
    let {
      saveDepartment,
      removeDepartment,
      putDepartment
    } = this.props;
    let rows = departments.map(dep => {
      return <RowDepartment key={dep.id}
                            department={dep}
                            saveDepartment={saveDepartment}
                            removeDepartment={removeDepartment}/>
    });
    return (
      <table>
        <thead>
        <tr>
          <td>
            Department name
          </td>
          <td>
            Employees number
          </td>
          <td>
            Average payment
          </td>
        </tr>
        </thead>
        <tbody>
        {rows}
        <FormDepartment putDepartment={putDepartment}/>
        </tbody>
      </table>
    )
  }
}

export default TableDepartment
