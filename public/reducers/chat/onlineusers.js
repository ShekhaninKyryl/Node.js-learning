import {
  CHAT_GET_ONLINE_USERS
} from '../actionsList';

const initialState = [];

export default function apiChatOnlineUsers(state = initialState, action) {
  let {type, users} = action;
  switch (type) {
    case CHAT_GET_ONLINE_USERS: {
      return [
        ...users
      ]
    }
    default: {
      return state
    }
  }
}

