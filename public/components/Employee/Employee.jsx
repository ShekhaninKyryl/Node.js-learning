import React, {Component} from "react";
import ReactDOM from "react-dom";
import TableEmployee from './TableEmployee.jsx'

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    fetch(`/departments/${this.props.departmentId}/employee`,
      {
        method: 'get',
      }).then(res => res.json())
      .then(res => this.setState({employees: res.result}));

  }

  render() {
    let {changeRender} = this.props;
    return (
      <div>
        <TableEmployee employees = {this.state.employees} changeRender={changeRender}/>
      </div>
    )
  };
}

export default Employee;
