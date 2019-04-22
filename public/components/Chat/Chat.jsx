import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import ChatHeader from "../../forms/ChatHeaderForm.jsx";
import ChatFooter from "../../forms/ChatFooterForm.jsx";
import {
  chatConnect,
  chatClose,
  sendUserInfo,
  sendMessage,
  joinToRoom
} from "../../actions/chatTracks";

class Chat extends PureComponent {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.chatConnect();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user !== prevProps.user) {
      this.props.sendUserInfo(this.props.user);
    }
  }

  async componentWillUnmount() {
    await this.props.chatClose();
  }

  render() {
    return (
      <div className='chat-main'>
        <div className='chat-head'>
          {Object.keys(this.props.users).length &&
          <ChatHeader initialValues={{room: this.props.chat.room, user: this.props.user.id}}
                      onSubmit={this.props.joinToRoom}
                      employees={this.props.users}
                      room={this.props.chat.room}/>}
        </div>
        <div className='chat-messages'>{this.props.messages.map((message, index) => {
            return (
              <div className={`chat-one-message ${+message.user === +this.props.user.id ? 'chat-one-message-my' : ''}`}
                   key={index}>
                <div className='chat-message-user'>{this.props.users.find(user => {
                  return +user.id === +message.user ? user : false;
                }).name}</div>
                <div className='chat-message-text'>{message.text}</div>
              </div>
            )
          }
        )}
        </div>
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

