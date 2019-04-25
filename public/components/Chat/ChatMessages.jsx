import React, {Component} from "react";
import {connect} from "react-redux";
import {joinToRoom} from "../../actions/chatTracks";
import * as ReactDOM from "react-dom";

class ChatMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      over: false,
      needDown: false
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.messages !== prevProps.messages) {
      this.setState({needDown: true});
    }
    if (!this.state.over) {
      if (this.state.needDown) {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
        this.setState({needDown: false});
      }
    }
  }

  render() {
    let user;
    return (
      <div
        onMouseEnter={() => this.setState({over: true})}
        onMouseLeave={() => this.setState({over: false})}
        className='chat-messages'>
        {this.props.messages.map((message, index) => {
            return (
              <div className={`chat-one-message ${+message.user === +this.props.user.id ? 'chat-one-message-my' : ''}`}
                   key={index}>
                <div className='chat-message-user'
                     onClick={() => {
                       console.log(this.props.users);
                       let user = this.props.user.id;
                       let room = this.props.users.find(u => +u.id === +message.user ? u : false).email;
                       if (!room) {
                         this.props.joinToRoom({user, room: '#general'});
                       } else {
                         this.props.joinToRoom({user, room});
                       }
                     }}>
                  {
                    (user = this.props.users.find(user => {
                      return +user.id === +message.user ? user : false;
                    })) || user ? user.name : 'removedUser'}
                </div>
                <div className='chat-message-text'>{message.text}</div>
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    users: state.users,
    user: state.user,
    messages: state.messages,
  }),
  dispatch => ({
    joinToRoom: (wrappedRoomOrId) => dispatch(joinToRoom(wrappedRoomOrId))
  })
)(ChatMessages)
