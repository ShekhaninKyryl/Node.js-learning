import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client'
import ChatHeader from "../../forms/ChatHeaderForm.jsx";
import ChatFooter from "../../forms/ChatFooterForm.jsx";
import {
  chatConnect,
  chatClose,
  sendUserInfo,
  sendMessage,
  joinToRoom
} from "../../Actions/chatTracks";


class Chat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.chatConnect();

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
  //   if (this.props.user.email !== nextProps.user.email) {
  //
  //     return true;
  //   }
  //   if (this.props.users !== nextProps.users) {
  //     return true;
  //   }
  //   if (this.props.messages.length !== nextProps.messages.length) {
  //     return true;
  //   }
  //   return true
  // }

  render() {
    return (
      <div className='chat-main'>
        <div className='chat-head'>
          {Object.keys(this.props.users).length &&
          <ChatHeader initialValues={{user: this.props.user.id}} onSubmit={this.props.joinToRoom}
                      employees={this.props.users}/>}
        </div>

        <div className='chat-messages'>{this.props.messages.map((message, index) => {
            return (
              <div className={`chat-one-message ${+message.user === +this.props.user.id ? 'chat-one-message-my' : ''}`}
                   key={index}>
                <div className='chat-message-user'>{message.user}</div>
                <div className='chat-message-text'>{message.text}</div>
              </div>
            )
          }
        )}
        </div>
        <div className="edge"/>
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
    chat: state.chat,
    messages: state.messages,
    users: state.users,
    onlineusers: state.onlineusers,
  }),
  dispatch => ({
    chatConnect: () => dispatch(chatConnect()),
    chatClose: () => dispatch(chatClose()),
    sendUserInfo: (user) => dispatch(sendUserInfo(user)),
    sendMessage: (wrappedMessage) => dispatch(sendMessage(wrappedMessage)),
    joinToRoom: (wrappedRoomOrId) => dispatch(joinToRoom(wrappedRoomOrId))
  })
)(Chat);

