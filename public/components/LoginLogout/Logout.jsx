import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getLogout} from "../../actions/loginTracks";
import {Link} from "react-router-dom";

export default class Logout extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className='my-button logout-button' onClick={this.props.logout}>
        <Link to='/guest'>Logout</Link>
      </button>
    )
  }
}
