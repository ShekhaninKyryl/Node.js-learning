import React, {Component} from 'react';
import Logout from '../LoginLogout/Logout.jsx';
import {connect} from "react-redux";
import {getUserInfo} from "../../actions/headerTracks";
import {getLogout} from "../../actions/loginTracks";

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  IsLogout() {
    let {isLogin} = this.props.login;
    if (isLogin) {
      return <Logout logout={this.props.logout}/>;
    } else {
      return null;
    }
  };

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.login.isLogin !== prevProps.login.isLogin) {
      this.props.getUser();
    }
  }

  render() {
    let {name, email} = this.props.user;
    return (
      <div className='header-container'>
      <span className='header-span span-user-name'>
      {`Hello ${name}`}
      </span>
        <span className='header-span span-user-email'>
                {email ? `Email: ${email}` : ''}
        </span>
        {this.IsLogout()}
      </div>

    )
  }
}

export default connect(
  state => ({
    login: state.login,
    user: state.user
  }),
  dispatch => ({
    getUser: () => dispatch(getUserInfo()),
    logout: () => dispatch(getLogout()),
  })
)(Header);
