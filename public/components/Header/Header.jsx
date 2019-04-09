import React, {PureComponent} from 'react';
import Logout from '../LoginLogout/Logout.jsx';

import {connect} from "react-redux";
import {getUserInfo} from "../../reducers/Actions/headerTracks";


class Header extends PureComponent {
  constructor(props) {
    super(props);
  }
  IsLogout() {
    let {isLogin} = this.props.api;
    if (isLogin) {
      return <Logout/>;
    } else {
      return null;
    }
  };
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    let {name, email, id} = this.props.user;
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
    api: state.api,
    user: state.user
  }),
  dispatch => ({
    getUser: () => dispatch(getUserInfo()),
  })
)(Header);
