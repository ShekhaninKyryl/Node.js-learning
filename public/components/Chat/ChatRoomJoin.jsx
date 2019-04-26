import React, {Component} from "react";
import ChatHeader from "../../forms/chatForms/ChatHeaderForm.jsx";


export default class ChatRoomJoin extends Component {
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
