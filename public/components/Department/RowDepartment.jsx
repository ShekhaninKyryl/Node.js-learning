import React, {Component} from "react";
import ReactDOM from "react-dom";

class RowDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      employeeCount: '',
      averagePayment: '',
      visible: true
    };

    this.changeRender = this.changeRender.bind(this);
    this.onChange = this.onChange.bind(this);

    this.saveDepartment = this.saveDepartment.bind(this);
    this.removeDepartment = this.removeDepartment.bind(this);
  }

  changeRender(obj) {
    this.props.changeRender(obj.target);
  }

  onChange(e) {
    this.setState({name: e.target.value})
  }

  componentDidMount() {
    let {id, name, employeeCount, averagePayment} = this.props.department;
    this.setState({id, name, employeeCount, averagePayment});
  }

  saveDepartment() {
    let {id, name} = this.state;
    this.props.saveDepartment({id, name});
  }

  removeDepartment() {
    let {id, name} = this.state;
    this.props.removeDepartment({id, name});
  }

  render() {
    let {id, name, employeeCount, averagePayment} = this.state;
    let {visible} = this.state;

    if (visible) {
      return (
        <tr>
          <td><input type='text' value={name} onChange={this.onChange}/></td>
          <td>{employeeCount}</td>
          <td>{averagePayment}</td>
          <td>
            <button id={id} render="employee" onClick={this.changeRender}>Employee</button>
          </td>
          <td>
            <button id={id} onClick={this.saveDepartment}>Save</button>
          </td>
          <td>
            <button id={id} onClick={this.removeDepartment}>Remove</button>
          </td>
        </tr>

      )
    } else {
      return null;
    }
  }
}


export default RowDepartment
