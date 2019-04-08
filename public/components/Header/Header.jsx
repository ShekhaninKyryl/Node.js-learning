import React, {useState, useEffect, useLayoutEffect} from 'react';
import Logout from '../LoginLogout/Logout.jsx';
import axios from "axios";
import {connect} from "react-redux";
import {getUserInfo} from "../../reducers/tracks/headerTracks";


function Header(props) {
    let {isLogin} = props.api;
    let {name, email, id} = props.user;


    const IsLogout = () => {
        if (isLogin) {
            return <Logout/>;
        } else {
            return null;
        }
    };
    useEffect(() => {
        props.getUser();
    }, [isLogin]);


    return (
        <div className='header-container'>
      <span className='header-span span-user-name'>
      {`Hello ${name}`}
      </span>
            <span className='header-span span-user-email'>
                {email ? `Email: ${email}` : ''}
        </span>
        <IsLogout/>
        </div>

    )

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
