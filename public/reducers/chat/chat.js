import {
  CHAT_JOIN_TO_ROOM,
  CHAT_CONNECT,
  CHAT_DISCONNECT
} from '../actionsList';

const initialState = {
  room: '#general',
  isConnected: false
};

export default function apiChatOnlineUsers(state = initialState, action) {
  let {type, room} = action;
  switch (type) {
    case CHAT_JOIN_TO_ROOM: {
      return {...state, room};
    }
    case CHAT_CONNECT: {
      return {...state, isConnected: true}
    }
    case CHAT_DISCONNECT: {
      return {...state, isConnected: false}
    }
    default: {
      return state
    }
  }
}

