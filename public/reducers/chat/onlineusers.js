import {
  CHAT_GET_ONLINE_USERS
} from '../actionsList';

const initialState = [];

export default function apiChatOnlineUsers(state = initialState, action) {
  let {type, onlineusers} = action;
  switch (type) {
    case CHAT_GET_ONLINE_USERS: {
      return [
        ...onlineusers
      ]
    }
    default: {
      return state
    }
  }
}

