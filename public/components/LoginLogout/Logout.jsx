import React, {Component} from 'react';
import {connect} from "react-redux";
import {getLogout} from "../../reducers/tracks/loginTracks";


class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input type="button" value="Logout" id="login" onClick={ this.props.logout}/>
    )
  }
}


export default connect(
  state => ({
    api: state.api
  }),
  dispatch => ({
    logout: () => dispatch(getLogout()),
  })
)
(Logout);
