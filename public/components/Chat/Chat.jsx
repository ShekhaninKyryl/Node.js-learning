import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client'
import {getDepartments} from "../../reducers/Actions/departmentTracks";

//let socket = io({autoConnect: false});


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      messages: [],
      text: ''
    };


    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('GET_USERS', users => {
      console.log('INSIDE MESSAGE:', users);
      this.setState({users});
    });
    this.socket.on('RECEIVE_MESSAGE', message => {
      console.log('RECIVE:');
      let {messages} = this.state;
      messages.push(message);
      this.setState({messages});
    })
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  sendMessage() {
    console.log('SEND!!!');
    this.socket.emit('SEND_MESSAGE', {user: this.props.user.name, text: this.state.text});
    event.preventDefault();

    //this.setState({text: ''});
  }

  componentWillUnmount() {
    this.socket.close();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.user.email !== nextProps.user.email) {
      this.socket.emit('SET_USER', nextProps.user);
      return true;
    }

    if (this.state.users !== nextState.users) {
      return true;
    }
    if (this.state.messages.length !== nextState.messages.length) {
      return true;
    }
    return true
  }

  render() {
    return (
      <div className='chat-main'>
        <div className='chat-head'>Active users: {Object.keys(this.state.users).map(val => <div
          key={val}>{this.state.users[val].email}</div>)}</div>
        <div>{this.state.messages.map((message, index) => <div
          key={index}>{`${message.user}: ${message.text}`}</div>)}</div>
        <div className="edge"/>
        <div className='chat-footer'>
          <form onSubmit={this.sendMessage}>
            <input type="text" value={this.state.text} onChange={this.handleChange}/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({})
)(Chat);

