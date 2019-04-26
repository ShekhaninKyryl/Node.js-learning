import React, {Component} from "react";
import * as ReactDOM from "react-dom";

require('regenerator-runtime/runtime');

export default class ChatMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needDown: false
    };
    this.linkToPrivetRoom = this.linkToPrivetRoom.bind(this);
  }

  async shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.messages !== nextProps.messages) {
      const node = ReactDOM.findDOMNode(this);
      if (node.scrollHeight === (node.scrollTop + node.clientHeight)) {
        await this.setState({needDown: true});
      }
      return true;
    }
    return false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const node = ReactDOM.findDOMNode(this);
    //console.log(node);
    if (this.state.needDown) {
      node.scrollTop = node.scrollHeight;
      this.setState({needDown: false});
    }
  }

  linkToPrivetRoom(message) {
    let messageUser = message.currentTarget.getAttribute('messageUser');
    let user = this.props.user.id;
    let room = this.props.users.find(u => +u.id === +messageUser ? u : false).email;
    if (!room) {
      this.props.joinToRoom({user, room: '#general'});
    } else {
      this.props.joinToRoom({user, room});
    }
  };


  //todo Enzyme chat DONE
  //todo scroll if down DONE
  // todo NOT inline DONE
  render() {
    let user;
    return (
      <div className='chat-messages'>
        {this.props.messages.map((message, index) => {
            return (
              <div className={`chat-one-message ${+message.user === +this.props.user.id ? 'chat-one-message-my' : ''}`}
                   key={index}>
                <div messageuser={message.user}
                     className='chat-message-user'
                     onClick={this.linkToPrivetRoom}>
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
