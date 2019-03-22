import React, {Component} from "react";
import ReactDOM from "react-dom";

class RowEmployee extends Component{
  constructor(props){
    super(props);
    this.changeRender = this.changeRender.bind(this);
  }
  changeRender(obj){
    this.props.changeRender(obj.target);
  }

  render() {
    let {id, name,pay,email} = this.props.employee;
    //let {changeRender} = this.props;
    return(
      <tr>
        <td>{name}</td>
        <td>{pay}</td>
        <td>{email}</td>
        {/*<td>*/}
          {/*<button id={id} render="employee" onClick={this.changeRender}>Employee</button>*/}
        {/*</td>*/}
      </tr>
    )
  }
}


export default RowEmployee
