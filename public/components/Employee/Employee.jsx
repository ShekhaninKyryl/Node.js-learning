import React, {Component} from "react";
import TableEmployee from './TableEmployee.jsx'
import {connect} from "react-redux";
import {getEmployees} from "../../reducers/Actions/employeeTracks";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
  }

  componentDidMount() {
    let department = this.props.departmentId;
    this.props.getEmployees(department)
      .catch(err => {
        this.setState({err})
      });
  }

//todo departmentID DONE
  render() {
    if (this.state.err) {
      console.log("err:", this.state.err);
      return (
        <div>
          <Link onClick={()=>this.setState({err: ''})} to='/departments'>Department not found!</Link>
        </div>
      )
    } else {
      return (
        <div>
          <TableEmployee departmentId={this.props.departmentId}/>
        </div>
      )
    }
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    getEmployees: (departmentId) => dispatch(getEmployees(departmentId)),
  })
)(Employee);
