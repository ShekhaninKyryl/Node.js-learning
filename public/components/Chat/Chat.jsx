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
      text: '',
      sendTo: '',
      activeRoom: 'general'
    };


    this.handleChange = this.handleChange.bind(this);

    this.moveToChanel = this.moveToChanel.bind(this);
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
      messages.unshift(message);
      this.setState({messages});
    });
    this.socket.on('JOINED', activeRoom => this.setState({activeRoom}));
  }

  handleChange(event) {
    let {name, value} = event.target;
    console.log('SendTo', event.target);
    this.setState({[name]: value});
  }

  moveToChanel(event) {
    let id1 = this.props.user.id;
    let id2 = Object.keys(this.state.users).find(element => this.state.users[element].email === this.state.sendTo ? element : false);
    console.log('Ids:', id1, id2);
    this.setState({messages: []});
    this.socket.emit('JOIN_ROOM', id1, id2);
    event.preventDefault();
  }

  sendMessage() {
    console.log('SEND!!!');
    let {messages} = this.state;
    messages.unshift({user: this.props.user.name, text: this.state.text});
    this.setState({messages});
    this.socket.emit('SEND_MESSAGE', {text: this.state.text});
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
        <div className='chat-head'>Active room: {this.state.activeRoom}
          <form onSubmit={this.moveToChanel}>
            <input list='activeUsers' name='sendTo' onChange={this.handleChange}/>
            <datalist id='activeUsers'>
              {Object.keys(this.state.users).map(val =>
                <option value={this.state.users[val].email} key={val}/>
              )}
            </datalist>
            <input type="submit" value="Move"/>
          </form>
        </div>

        <div className='chat-messages'>{this.state.messages.map((message, index) => <div
          key={index}>{`${message.user}: ${message.text}`}</div>)}</div>
        <div className="edge"/>
        <div className='chat-footer'>
          <form onSubmit={this.sendMessage}>
            <input name='text' type="text" value={this.state.text} onChange={this.handleChange}/>
            <input type="submit" value="Send"/>
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

