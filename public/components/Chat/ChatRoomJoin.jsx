import React, {Component} from "react";
import {connect} from "react-redux";
import ChatHeader from "../../forms/ChatHeaderForm.jsx";
import {joinToRoom} from "../../actions/chatTracks";


class ChatRoomJoin extends Component {
  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log(this.props.user.id, nextProps.user.id);
  //   return this.props.user.id !== nextProps.user.id;
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
