import React, {Component} from "react";
import ReactDOM from "react-dom";
import Input from "../Input.jsx";


class FormDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.putDepartment = this.putDepartment.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  putDepartment() {
    let {name} = this.state;
    let putDepartment = this.props.putDepartment;
    putDepartment({name})
      .then(res => {
        console.log('Add dep:', res);
        if (res) {
          this.setState({name: ''});
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let className = "department-form";
    return (
      <tr>
        <td>
          <Input className={className} value={this.state.name} type={'text'} id={'name'}
                 handleChange={this.handleChange}/>
        </td>
        <td/>
        <td/>
        <td>
          <input type="button" value="Create" onClick={this.putDepartment}/>
        </td>
      </tr>
    )
  }
}


export default FormDepartment;
