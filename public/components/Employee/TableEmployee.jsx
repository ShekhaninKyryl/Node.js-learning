import React, {Component} from "react";
import RowEmployee from './RowEmployee.jsx'
import FormEmployee from './FormEmployee.jsx';
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class TableEmployee extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {employees} = this.props;
    let rows = employees.map(emp => {
      return <RowEmployee key={emp.id} employee={emp}/>
    });

    let toDepartmentURL = `/departments`;

    return (
      <div>
        <div>
          <div>
            <div>Employee name</div>
            <div>Payment</div>
            <div>Email</div>
            <div/>
            <div/>
          </div>
        </div>
        <div>
          {rows}
        </div>
        <div>
          <div>
            <div>
              <button>
                <Link to={toDepartmentURL}>Departments</Link>
              </button>
            </div>
          </div>
          <div>
            <div>
              <hr/>
            </div>
          </div>
          <div>
            <FormEmployee departmentId={this.props.departmentId}/>
          </div>
        </div>
      </div>
    )

  }
}

export default connect(
  state => ({
    employees: state.employees
  })
)(TableEmployee)
