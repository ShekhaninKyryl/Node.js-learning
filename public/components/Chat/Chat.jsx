import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatFooter from "../../forms/chatForms/ChatFooterForm.jsx";
import ChatRoomJoin from "./ChatRoomJoin.jsx";
import ChatMessages from "./ChatMessages.jsx";

import {
  chatConnect,
  chatClose,
  sendUserInfo,
  sendMessage,
} from "../../actions/chatTracks";


class Chat extends Component {

  componentDidMount() {
    this.props.chatConnect();
    //this.props.sendUserInfo(this.props.user);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user !== prevProps.user) {
      this.props.sendUserInfo(this.props.user);
    }
  }

  componentWillUnmount() {
    this.props.chatClose();
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   if (this.props.user !== nextProps.user) {
  //     this.props.sendUserInfo(nextProps.user);
  //     return true;
  //   }
  //   return false;
  // }


  render() {
    return (
      <div className='chat-main'>
        <ChatRoomJoin/>
        <ChatMessages/>
        <div className='chat-footer'>
          <ChatFooter initialValues={{user: this.props.user.id}} onSubmit={this.props.sendMessage}/>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    chatConnect: () => dispatch(chatConnect()),
    chatClose: () => dispatch(chatClose()),
    sendUserInfo: (user) => dispatch(sendUserInfo(user)),
    sendMessage: (wrappedMessage) => dispatch(sendMessage(wrappedMessage)),
  })
)(Chat);

