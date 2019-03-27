import React, {Component} from "react";
import ReactDOM from "react-dom";
import Input from "../Input.jsx";


class FormDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      err: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.putDepartment = this.putDepartment.bind(this);
  }

  handleChange(event) {
    let err = this.state.err;
    err[event.target.id] = '';
    this.setState({[event.target.id]: event.target.value, err: err});
  }

  putDepartment() {
    let {name} = this.state;
    let putDepartment = this.props.putDepartment;
    putDepartment({name})
      .then(res => {
        if (res.err) {
          this.setState({err: res.err.message})
        } else {
          this.setState({name: ''});
        }
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    let className = "department-form";
    return (
      <tr>
        <td>
          <Input className={className} value={this.state.name} type={'text'} id={'name'}
                 handleChange={this.handleChange}/>
          <div>{this.state.err.name}</div>
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
