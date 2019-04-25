import React, {Component} from "react";
import {connect} from "react-redux";
import ChatHeader from "../../forms/chatForms/ChatHeaderForm.jsx";
import {joinToRoom} from "../../actions/chatTracks";


class ChatRoomJoin extends Component {

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return this.props.users.length !== nextProps.users.length;
  // }

  render() {
    return (
      <div className='chat-head'>
        {Object.keys(this.props.users).length &&
        <ChatHeader initialValues={{room: this.props.chat.room, user: this.props.user.id}}
                    onSubmit={this.props.joinToRoom}
                    employees={this.props.users}
                    room={this.props.chat.room}/>}
      </div>
    )
  }
}

export default connect(
  state => ({
    users: state.users,
    chat: state.chat,
    user: state.user
  }),
  dispatch => ({
    joinToRoom: (wrappedRoomOrId) => dispatch(joinToRoom(wrappedRoomOrId))
  })
)(ChatRoomJoin)
