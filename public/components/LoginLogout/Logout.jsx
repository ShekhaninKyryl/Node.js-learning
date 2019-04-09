import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {getLogout} from "../../reducers/Actions/loginTracks";


class Logout extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input className='my-button logout-button' type="button" value="Logout" id="login" onClick={this.props.logout}/>
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
