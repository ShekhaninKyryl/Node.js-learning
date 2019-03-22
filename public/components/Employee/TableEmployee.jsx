import React, {Component} from "react";
import ReactDOM from "react-dom";
import RowEmployee from './RowEmployee.jsx'

class TableEmployee extends Component {
  constructor(props) {
    super(props);
    this.changeRender = this.changeRender.bind(this);
  }

  changeRender(obj){
    this.props.changeRender(obj.target);
  }

  render() {
    let {employees} = this.props;
    let {changeRender} = this.props;
    let rows = employees.map(dep => {
      return <RowEmployee employee={dep} changeRender={changeRender}/>
    });
    return (
      <table>
        <thead>
        <tr>
          <td>
            Name
          </td>
          <td>
            Payment
          </td>
          <td>
            Email
          </td>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
        <tr>
          <td>
            <button render="departments" onClick={this.changeRender}>Back</button>
          </td>
        </tr>
      </table>
    )
  }
}

export default TableEmployee
