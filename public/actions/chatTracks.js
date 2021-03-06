import io from 'socket.io-client'

import {
  setEmployees,
  setOnlineEmployees,
  setEmployeeInfo,
  mesToEmployee,
  mesToServer,
  clearMessages,
  joinRoom,
  joinedRoom
} from '../../socketIOClientListeners__import__';

import {
  CHAT_GET_USERS,
  CHAT_GET_ONLINE_USERS,

  CHAT_GET_MESSAGE,
  CHAT_SEND_MESSAGE,
  CLEAR_MESSAGES,

  CHAT_JOIN_TO_ROOM,
  CHAT_CONNECT,
  CHAT_DISCONNECT
} from '../reducers/actionsList';
import {getIsLogin} from "./loginTracks";

const socket = io({
  autoConnect: false
});

const chatConnect = () => {
  return dispatch => {
    socket.connect();
    dispatch({type: CLEAR_MESSAGES});
    dispatch({type: CHAT_CONNECT});
    socket.on(setEmployees, users => {
      dispatch({type: CHAT_GET_USERS, users})
    });
    socket.on(mesToEmployee, message => {
      dispatch({type: CHAT_GET_MESSAGE, message})
    });
    socket.on(joinedRoom, room => {
      dispatch({type: CHAT_JOIN_TO_ROOM, room})
    });
    socket.on(clearMessages, () => {
      dispatch({type: CLEAR_MESSAGES});
    });
    socket.on(setOnlineEmployees, onlineusers => {
      dispatch({type: CHAT_GET_ONLINE_USERS, onlineusers});
    })
  }
};
const chatClose = () => {
  return dispatch => {
    socket.close();
    socket.off(setEmployees);
    socket.off(mesToEmployee);
    socket.off(joinedRoom);
    socket.off(clearMessages);
    socket.off(setOnlineEmployees);
    dispatch({type: CLEAR_MESSAGES});
    dispatch({type: CHAT_DISCONNECT});
    dispatch({type: CHAT_JOIN_TO_ROOM})
  }
};

const sendUserInfo = (user) => {
  return dispatch => {
    socket.emit(setEmployeeInfo, user);
  }
};

const sendMessage = (wrappedMessage) => {
  return async dispatch => {
    let {user, text} = wrappedMessage;
    if (await dispatch(getIsLogin())) {
      socket.emit(mesToServer, {user, text});
      dispatch({type: CHAT_SEND_MESSAGE, message: {user, text}});
    }
  }
};

const joinToRoom = (wrappedRoom) => {
  return dispatch => {
    let {user, room} = wrappedRoom;
    socket.emit(joinRoom, user, room);
  }
};

export {
  chatConnect,
  chatClose,
  sendUserInfo,
  sendMessage,
  joinToRoom
}
