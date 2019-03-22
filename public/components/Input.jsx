import React, { Component } from "react";
import ReactDOM from "react-dom";


class Input extends Component{
  constructor(props){
    super(props);
  }

  render() {
    let {type, id, className, handleChange, value} = this.props;
    return (
      <div className={className}>
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={handleChange}
        />
      </div>
    )
  }
}

export default Input;
